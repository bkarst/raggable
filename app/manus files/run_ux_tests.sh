#!/bin/bash

# User Experience Test Script for Moringa Platform
# This script guides a tester through manual user experience testing

echo "Moringa Platform User Experience Testing"
echo "========================================"
echo "This script will guide you through manual user experience testing."
echo "Please follow the instructions and provide feedback when prompted."
echo ""

# Create test report file
mkdir -p /home/ubuntu/moringa/system-tests/ux-tests
cd /home/ubuntu/moringa/system-tests/ux-tests
touch ux_test_report.md
echo "# Moringa Platform User Experience Test Report" > ux_test_report.md
echo "Date: $(date)" >> ux_test_report.md
echo "" >> ux_test_report.md

# Function to log test results
log_test_step() {
  local step_name=$1
  local instructions=$2
  
  echo "## Test: $step_name" >> ux_test_report.md
  echo "Instructions: $instructions" >> ux_test_report.md
  echo "" >> ux_test_report.md
  
  echo "Test Step: $step_name"
  echo "Instructions: $instructions"
  echo ""
  read -p "Press Enter when ready to continue..."
  echo ""
}

log_feedback() {
  local step_name=$1
  local feedback=$2
  
  echo "Feedback for $step_name: $feedback" >> ux_test_report.md
  echo "" >> ux_test_report.md
}

# Test 1: Web Application Login
log_test_step "Web Application Login" "1. Open a browser and navigate to https://moringa.app
2. Click on the 'Sign In' button
3. Enter test credentials (email: test@example.com, password: Password123!)
4. Click the 'Sign In' button
5. Verify you are redirected to the dashboard"

read -p "Was the login process smooth and intuitive? (yes/no): " login_feedback
read -p "Any issues or suggestions for improvement? " login_suggestions
log_feedback "Web Application Login" "$login_feedback. $login_suggestions"

# Test 2: Dashboard Navigation
log_test_step "Dashboard Navigation" "1. From the dashboard, explore the navigation menu
2. Visit each section: Subscriptions, Usage, Mailboxes, and Billing
3. Test the responsiveness of the UI on different screen sizes
4. Check if all information is clearly presented"

read -p "Was the dashboard navigation intuitive? (yes/no): " nav_feedback
read -p "Any issues or suggestions for improvement? " nav_suggestions
log_feedback "Dashboard Navigation" "$nav_feedback. $nav_suggestions"

# Test 3: Subscription Management
log_test_step "Subscription Management" "1. Navigate to the Subscriptions page
2. Review the available subscription plans
3. Try to upgrade to a different plan (don't complete payment)
4. Test the cancel subscription flow (don't actually cancel)"

read -p "Was the subscription management process clear? (yes/no): " sub_feedback
read -p "Any issues or suggestions for improvement? " sub_suggestions
log_feedback "Subscription Management" "$sub_feedback. $sub_suggestions"

# Test 4: Desktop Client Installation
log_test_step "Desktop Client Installation" "1. Download the desktop client installer
2. Run the installer and follow the installation process
3. Launch the application
4. Note any issues during installation or first launch"

read -p "Was the installation process smooth? (yes/no): " install_feedback
read -p "Any issues or suggestions for improvement? " install_suggestions
log_feedback "Desktop Client Installation" "$install_feedback. $install_suggestions"

# Test 5: Desktop Client Login
log_test_step "Desktop Client Login" "1. On the desktop client login screen, enter the same credentials
2. Click 'Sign In'
3. Verify you are logged in successfully
4. Check if your account information is correctly displayed"

read -p "Was the desktop client login process smooth? (yes/no): " desktop_login_feedback
read -p "Any issues or suggestions for improvement? " desktop_login_suggestions
log_feedback "Desktop Client Login" "$desktop_login_feedback. $desktop_login_suggestions"

# Test 6: Email Provider Connection
log_test_step "Email Provider Connection" "1. Navigate to the Settings or Mailboxes section
2. Click on 'Connect Mailbox'
3. Select an email provider (Gmail, Outlook, etc.)
4. Follow the authentication flow (don't complete if using real credentials)
5. Verify the connection status"

read -p "Was the email provider connection process intuitive? (yes/no): " email_connect_feedback
read -p "Any issues or suggestions for improvement? " email_connect_suggestions
log_feedback "Email Provider Connection" "$email_connect_feedback. $email_connect_suggestions"

# Test 7: Email Viewing and Navigation
log_test_step "Email Viewing and Navigation" "1. Navigate to the mailbox view
2. Check if emails are properly displayed
3. Test selecting different folders (Inbox, Sent, etc.)
4. Open several emails and check content rendering
5. Test email actions (reply, forward, delete)"

read -p "Was the email viewing experience good? (yes/no): " email_view_feedback
read -p "Any issues or suggestions for improvement? " email_view_suggestions
log_feedback "Email Viewing and Navigation" "$email_view_feedback. $email_view_suggestions"

# Test 8: AI-Assisted Email Drafting
log_test_step "AI-Assisted Email Drafting" "1. Click 'Compose' to create a new email
2. In the AI assistance section, enter an intent like 'Accept the meeting invitation for next Tuesday'
3. Click 'Generate'
4. Evaluate the quality of the generated email
5. Make edits to the draft and test the 'Improve' feature"

read -p "How would you rate the quality of the AI-generated email (1-10)? " ai_quality_rating
read -p "Was the AI assistance interface intuitive? (yes/no): " ai_interface_feedback
read -p "Any issues or suggestions for improvement? " ai_suggestions
log_feedback "AI-Assisted Email Drafting" "Quality rating: $ai_quality_rating/10. Interface feedback: $ai_interface_feedback. $ai_suggestions"

# Test 9: Performance and Responsiveness
log_test_step "Performance and Responsiveness" "1. Test the application with multiple emails and mailboxes
2. Measure the response time for AI features
3. Check application performance during heavy usage
4. Test on different devices if possible"

read -p "How would you rate the overall performance (1-10)? " performance_rating
read -p "Any performance issues noticed? " performance_issues
log_feedback "Performance and Responsiveness" "Performance rating: $performance_rating/10. Issues: $performance_issues"

# Test 10: Overall User Experience
log_test_step "Overall User Experience" "1. Reflect on the overall experience using the platform
2. Consider the visual design, usability, and feature set
3. Think about what features are missing or could be improved"

read -p "How would you rate the overall user experience (1-10)? " ux_rating
read -p "What did you like most about the platform? " ux_likes
read -p "What could be improved? " ux_improvements
log_feedback "Overall User Experience" "Overall rating: $ux_rating/10. Likes: $ux_likes. Improvements: $ux_improvements"

# Summarize test results
echo "" >> ux_test_report.md
echo "# Summary" >> ux_test_report.md
echo "This user experience test covered the main functionality of the Moringa platform, including:" >> ux_test_report.md
echo "- Web and desktop client login" >> ux_test_report.md
echo "- Dashboard navigation" >> ux_test_report.md
echo "- Subscription management" >> ux_test_report.md
echo "- Email provider connection" >> ux_test_report.md
echo "- Email viewing and management" >> ux_test_report.md
echo "- AI-assisted email features" >> ux_test_report.md
echo "- Overall performance and user experience" >> ux_test_report.md

echo "========================================"
echo "User experience testing completed."
echo "Test report saved to /home/ubuntu/moringa/system-tests/ux-tests/ux_test_report.md"
echo "Thank you for your feedback!"
