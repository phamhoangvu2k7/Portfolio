from django.db import models

class Project(models.Model):
    title = models.CharField(max_length=200) # Tên dự án
    description = models.TextField()         # Mô tả chi tiết
    link = models.URLField(blank=True)       # Link GitHub hoặc Link Web thực tế
    created_at = models.DateTimeField(auto_now_add=True) # Tự động lưu ngày tạo

    def __str__(self):
        return self.title 