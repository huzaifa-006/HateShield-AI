from django.shortcuts import render
from django.http import JsonResponse
from Home.models import Contact
from django.views.decorators.csrf import csrf_exempt 
import json

@csrf_exempt
def contactUS(request):
    if request.method == "POST":
        try:
            data = json.loads(request.body)
            name = data.get("name")  
            email = data.get("email")
            message = data.get("message")

            # Validate required fields
            if not all([name, email, message]):
                return JsonResponse({"error": "All fields are required"}, status=400)

            # Create and save contact data
            contactData = Contact(name=name, email=email, message=message)
            contactData.save()
            
            return JsonResponse({
                "message": "Thanks for Contacting US",
                "status": "success"
            }, status=200)
        
        except json.JSONDecodeError:
            return JsonResponse({"error": "Invalid JSON format"}, status=400)
        except Exception as e:
            return JsonResponse({"error": str(e)}, status=500)
    
    return JsonResponse({"error": "Method not allowed"}, status=405)

        
