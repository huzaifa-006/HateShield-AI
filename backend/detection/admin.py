from django.contrib import admin
from .models import detection, DetectionFeedback

@admin.register(detection)
class DetectionAdmin(admin.ModelAdmin):
    list_display = ('id', 'text', 'result', 'confidence', 'probability', 'created_at')
    list_filter = ('result', 'created_at')
    search_fields = ('text', 'result')
    readonly_fields = ('created_at',)
    ordering = ('-created_at',)

@admin.register(DetectionFeedback)
class DetectionFeedbackAdmin(admin.ModelAdmin):
    list_display = ('id', 'detection', 'rating', 'comment', 'created_at', 'ip_address')
    list_filter = ('rating', 'created_at')
    search_fields = ('detection__text', 'comment')
    readonly_fields = ('created_at', 'ip_address', 'user_agent')
    ordering = ('-created_at',)
    
    def get_queryset(self, request):
        return super().get_queryset(request).select_related('detection')