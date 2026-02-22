from django.http import JsonResponse, HttpResponse
from django.views.decorators.csrf import csrf_exempt
from detection.models import detection, DetectionFeedback
from detection.utils import run_pipeline
import json
import PyPDF2
import docx
import io

ALLOWED_EXTENSIONS = {'txt', 'pdf', 'docx'}

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

def extract_text_from_file(file):
    file_extension = file.name.rsplit('.', 1)[1].lower()
    
    if file_extension == 'txt':
        return file.read().decode('utf-8')
    
    elif file_extension == 'pdf':
        pdf_reader = PyPDF2.PdfReader(file)
        text = ""
        for page in pdf_reader.pages:
            text += page.extract_text()
        return text
    
    elif file_extension == 'docx':
        doc = docx.Document(file)
        text = ""
        for paragraph in doc.paragraphs:
            text += paragraph.text + "\n"
        return text
    
    return ""

@csrf_exempt
def test_model(request):
    """Simple endpoint to test if the model is working"""
    if request.method == "GET":
        test_text = "this is a test message"
        try:
            results = run_pipeline(test_text)
            return JsonResponse({
                "status": "success",
                "message": "Model is working correctly",
                "test_results": results
            })
        except Exception as e:
            return JsonResponse({
                "status": "error",
                "message": f"Model test failed: {str(e)}"
            }, status=500)
    else:
        return JsonResponse({"error": "Only GET method allowed"}, status=405)

@csrf_exempt
def hate_speech_detection(request):
    if request.method == "POST":
        text = ""
        
        # Check if file was uploaded
        if request.FILES.get('file'):
            file = request.FILES['file']
            if allowed_file(file.name):
                try:
                    text = extract_text_from_file(file)
                except Exception as e:
                    return JsonResponse({"error": f"Error processing file: {str(e)}"}, status=400)
            else:
                return JsonResponse({"error": "File type not allowed. Please upload .txt, .pdf, or .docx files"}, status=400)
        
        # If no file or file processing failed, try to get text from POST data
        if not text:
            text = request.POST.get('text', '').strip()
            
            # If not in form data, try to get from JSON body
            if not text and request.content_type == 'application/json':
                try:
                    data = json.loads(request.body)
                    text = data.get('text', '').strip()
                except json.JSONDecodeError:
                    pass
        
        if not text:
            return JsonResponse({"error": "Please enter text or upload a file"}, status=400)
        
        try:
            results = run_pipeline(text)
            
            # Save to database with more detailed information
            detection_obj = detection(
                text=results["original_text"],
                result=results["prediction"],
                confidence=results["confidence"],
                probability=results["probability"]
            )
            detection_obj.save()
            
            # Prepare response with detailed information
            response_data = {
                "message": "Text processed successfully",
                "detection_id": detection_obj.id,  
                "results": {
                    "original_text": results["original_text"],
                    "preprocessed_text": results["preprocessed_text"],
                    "tokens": results["tokens"],
                    "prediction": results["prediction"],
                    "confidence": results["confidence"],
                    "probability": results["probability"],
                    "top_influential_tokens": results["top_influential_tokens"]
                }
            }
            
            return JsonResponse(response_data, status=200)
            
        except Exception as e:
            return JsonResponse({"error": str(e)}, status=500)
    else:
        return HttpResponse("Invalid request")

@csrf_exempt
def submit_feedback(request):
    """Handle feedback submission for detection results"""
    if request.method == "POST":
        try:
            # Parse JSON data
            if request.content_type == 'application/json':
                data = json.loads(request.body)
            else:
                data = request.POST
            
            detection_id = data.get('detection_id')
            rating = data.get('rating')
            comment = data.get('comment', '')
            
            # Validate required fields
            if not detection_id:
                return JsonResponse({"error": "Detection ID is required"}, status=400)
            
            if not rating or not isinstance(rating, int) or rating < 1 or rating > 5:
                return JsonResponse({"error": "Valid rating (1-5) is required"}, status=400)
            
            # Get the detection object
            try:
                detection_obj = detection.objects.get(id=detection_id)
            except detection.DoesNotExist:
                return JsonResponse({"error": "Detection not found"}, status=404)
            
            # Check if feedback already exists for this detection
            if hasattr(detection_obj, 'feedback'):
                return JsonResponse({"error": "Feedback already submitted for this detection"}, status=400)
            
            # Get client information
            ip_address = get_client_ip(request)
            user_agent = request.META.get('HTTP_USER_AGENT', '')
            
            # Create feedback
            feedback = DetectionFeedback(
                detection=detection_obj,
                rating=rating,
                comment=comment,
                ip_address=ip_address,
                user_agent=user_agent
            )
            feedback.save()
            
            return JsonResponse({
                "message": "Feedback submitted successfully",
                "feedback_id": feedback.id,
                "rating": rating
            }, status=201)
            
        except json.JSONDecodeError:
            return JsonResponse({"error": "Invalid JSON data"}, status=400)
        except Exception as e:
            return JsonResponse({"error": str(e)}, status=500)
    else:
        return JsonResponse({"error": "Only POST method allowed"}, status=405)

def get_client_ip(request):
    """Get client IP address"""
    x_forwarded_for = request.META.get('HTTP_X_FORWARDED_FOR')
    if x_forwarded_for:
        ip = x_forwarded_for.split(',')[0]
    else:
        ip = request.META.get('REMOTE_ADDR')
    return ip    