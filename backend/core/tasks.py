from celery import shared_task
from django.conf import settings
from django.core.mail import EmailMultiAlternatives


@shared_task(bind=True, max_retries=3, default_retry_delay=60)
def deliver_email(self, subject, body, to, from_email=None, html_message=None):
    try:
        recipients = [to] if isinstance(to, str) else list(to)
        from_email = settings.DEFAULT_FROM_EMAIL
        msg = EmailMultiAlternatives(
            subject=subject,
            body=body,
            from_email=from_email,
            to=recipients,
        )
        if html_message:
            msg.attach_alternative(html_message, "text/html")
        msg.send()

    except Exception as exc:
        self.retry(exc=exc)
