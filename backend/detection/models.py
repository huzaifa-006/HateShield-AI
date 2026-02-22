from django.db import models

class detection(models.Model):
    id = models.AutoField(primary_key=True)
    text = models.CharField(max_length=1000, default="")
    result = models.CharField(max_length=50, default="")
    confidence = models.FloatField(default=0.0)
    probability = models.FloatField(default=0.0)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.result} - {self.text[:50]}"

class DetectionFeedback(models.Model):
    RATING_CHOICES = [
        (1, '1 Star - Very Poor'),
        (2, '2 Stars - Poor'),
        (3, '3 Stars - Average'),
        (4, '4 Stars - Good'),
        (5, '5 Stars - Excellent'),
    ]
    
    detection = models.OneToOneField(detection, on_delete=models.CASCADE, related_name='feedback')
    rating = models.IntegerField(choices=RATING_CHOICES, help_text="User rating from 1 to 5 stars")
    comment = models.TextField(blank=True, null=True, help_text="Optional user comment")
    created_at = models.DateTimeField(auto_now_add=True)
    ip_address = models.GenericIPAddressField(blank=True, null=True)
    user_agent = models.TextField(blank=True, null=True)

    class Meta:
        verbose_name = "Detection Feedback"
        verbose_name_plural = "Detection Feedbacks"

    def __str__(self):
        return f"Feedback for Detection #{self.detection.id} - {self.rating} stars"