import sys
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart

# Email credentials
sender_email = "fakeuser123ab@gmail.com"
password = "grqq imcd mawa hdrj"

# Parse arguments
receiver_email = sys.argv[1]
code = sys.argv[2]

# Email content
subject = "Desarrollo de aplicaciones web"
body = f"Your sign-up verification code is: {code}"

# Create the email
message = MIMEMultipart()
message["From"] = sender_email
message["To"] = receiver_email
message["Subject"] = subject
message.attach(MIMEText(body, "plain"))

try:
    # Set up the server and send the email
    with smtplib.SMTP("smtp.gmail.com", 587) as server:
        server.starttls()  # Upgrade the connection to secure
        server.login(sender_email, password)
        server.sendmail(sender_email, receiver_email, message.as_string())
    data_to_pass_back = 'success'
except Exception as e:
    data_to_pass_back = 'fail'

# Output the result back to the calling process
print(data_to_pass_back)
sys.stdout.flush()
