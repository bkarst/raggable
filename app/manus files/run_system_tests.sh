#!/bin/bash

# System Testing Script for Moringa Platform
# This script performs end-to-end testing of the Moringa platform

echo "Starting Moringa Platform System Testing..."
echo "============================================"

# Create test directory
mkdir -p /home/ubuntu/moringa/system-tests
cd /home/ubuntu/moringa/system-tests

# Create test report file
touch test_report.md
echo "# Moringa Platform System Test Report" > test_report.md
echo "Date: $(date)" >> test_report.md
echo "" >> test_report.md

# Function to log test results
log_test() {
  local test_name=$1
  local status=$2
  local details=$3
  
  echo "## Test: $test_name" >> test_report.md
  echo "Status: $status" >> test_report.md
  echo "Details: $details" >> test_report.md
  echo "" >> test_report.md
  
  echo "Test: $test_name - Status: $status"
}

# Test 1: Check if Next.js web app builds successfully
echo "Testing Next.js web app build..."
cd /home/ubuntu/moringa/web-app/moringa-web
if npm run build; then
  log_test "Next.js Build" "PASS" "Web application builds successfully without errors"
else
  log_test "Next.js Build" "FAIL" "Web application build failed"
fi

# Test 2: Check if Tauri desktop client builds successfully
echo "Testing Tauri desktop client build..."
cd /home/ubuntu/moringa/desktop-client/moringa-desktop
if npm run build; then
  log_test "Tauri Build" "PASS" "Desktop client builds successfully without errors"
else
  log_test "Tauri Build" "FAIL" "Desktop client build failed"
fi

# Test 3: Test database migrations
echo "Testing database migrations..."
cd /home/ubuntu/moringa/web-app/moringa-web
if npx prisma migrate dev --name test_migration; then
  log_test "Database Migrations" "PASS" "Database migrations run successfully"
else
  log_test "Database Migrations" "FAIL" "Database migrations failed"
fi

# Test 4: Run API endpoint tests
echo "Testing API endpoints..."
cd /home/ubuntu/moringa/web-app/moringa-web
if npm test -- -t "API"; then
  log_test "API Endpoints" "PASS" "API endpoint tests passed"
else
  log_test "API Endpoints" "FAIL" "API endpoint tests failed"
fi

# Test 5: Run Vue component tests
echo "Testing Vue components..."
cd /home/ubuntu/moringa/desktop-client/moringa-desktop
if npm test; then
  log_test "Vue Components" "PASS" "Vue component tests passed"
else
  log_test "Vue Components" "FAIL" "Vue component tests failed"
fi

# Test 6: Test authentication flow
echo "Testing authentication flow..."
cd /home/ubuntu/moringa/system-tests
cat > auth_test.js << 'EOL'
const fetch = require('node-fetch');

async function testAuth() {
  try {
    // Test registration
    const registerResponse = await fetch('http://localhost:3000/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: 'test@example.com',
        password: 'Password123!',
        name: 'Test User'
      })
    });
    
    if (!registerResponse.ok) {
      throw new Error(`Registration failed: ${await registerResponse.text()}`);
    }
    
    console.log('Registration test passed');
    
    // Test login
    const loginResponse = await fetch('http://localhost:3000/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: 'test@example.com',
        password: 'Password123!'
      })
    });
    
    if (!loginResponse.ok) {
      throw new Error(`Login failed: ${await loginResponse.text()}`);
    }
    
    const { token } = await loginResponse.json();
    console.log('Login test passed');
    
    // Test protected endpoint
    const protectedResponse = await fetch('http://localhost:3000/api/auth/validate', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    });
    
    if (!protectedResponse.ok) {
      throw new Error(`Protected endpoint test failed: ${await protectedResponse.text()}`);
    }
    
    console.log('Protected endpoint test passed');
    return true;
  } catch (error) {
    console.error('Authentication test failed:', error);
    return false;
  }
}

testAuth().then(success => {
  process.exit(success ? 0 : 1);
});
EOL

if node auth_test.js; then
  log_test "Authentication Flow" "PASS" "Authentication flow works correctly"
else
  log_test "Authentication Flow" "FAIL" "Authentication flow has issues"
fi

# Test 7: Test AI response features
echo "Testing AI response features..."
cd /home/ubuntu/moringa/system-tests
cat > ai_test.js << 'EOL'
const fetch = require('node-fetch');

async function testAIFeatures() {
  try {
    // Mock login to get token
    const token = 'test-token';
    
    // Test email draft generation
    const draftResponse = await fetch('http://localhost:3000/api/email/draft', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        emailThread: 'Hi, would you be available for a meeting next week?',
        userIntent: 'Accept the meeting and propose Tuesday at 2pm',
        tone: 'professional'
      })
    });
    
    if (!draftResponse.ok) {
      throw new Error(`Draft generation failed: ${await draftResponse.text()}`);
    }
    
    console.log('Email draft generation test passed');
    
    // Test email improvement
    const improveResponse = await fetch('http://localhost:3000/api/email/improve', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        emailThread: 'Hi, would you be available for a meeting next week?',
        userDraft: 'Yes I can meet next week. How about Tuesday?',
        tone: 'professional'
      })
    });
    
    if (!improveResponse.ok) {
      throw new Error(`Email improvement failed: ${await improveResponse.text()}`);
    }
    
    console.log('Email improvement test passed');
    
    // Test email summarization
    const summarizeResponse = await fetch('http://localhost:3000/api/email/summarize', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        emailThread: 'Email 1: Hi, would you be available for a meeting next week?\nEmail 2: Yes, I could meet on Monday or Tuesday.\nEmail 3: Tuesday works better for me. How about 2pm?'
      })
    });
    
    if (!summarizeResponse.ok) {
      throw new Error(`Email summarization failed: ${await summarizeResponse.text()}`);
    }
    
    console.log('Email summarization test passed');
    
    return true;
  } catch (error) {
    console.error('AI features test failed:', error);
    return false;
  }
}

testAIFeatures().then(success => {
  process.exit(success ? 0 : 1);
});
EOL

if node ai_test.js; then
  log_test "AI Response Features" "PASS" "AI response features work correctly"
else
  log_test "AI Response Features" "FAIL" "AI response features have issues"
fi

# Test 8: Test subscription and payment flow
echo "Testing subscription and payment flow..."
cd /home/ubuntu/moringa/system-tests
cat > payment_test.js << 'EOL'
const fetch = require('node-fetch');

async function testPaymentFlow() {
  try {
    // Mock login to get token
    const token = 'test-token';
    
    // Test checkout session creation
    const checkoutResponse = await fetch('http://localhost:3000/api/stripe/checkout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        priceId: 'price_test123',
        successUrl: 'http://localhost:3000/dashboard/subscriptions?success=true',
        cancelUrl: 'http://localhost:3000/dashboard/subscriptions?canceled=true'
      })
    });
    
    if (!checkoutResponse.ok) {
      throw new Error(`Checkout session creation failed: ${await checkoutResponse.text()}`);
    }
    
    console.log('Checkout session creation test passed');
    
    // Test subscription status check
    const subscriptionResponse = await fetch('http://localhost:3000/api/stripe/subscription', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    });
    
    if (!subscriptionResponse.ok) {
      throw new Error(`Subscription status check failed: ${await subscriptionResponse.text()}`);
    }
    
    console.log('Subscription status check test passed');
    
    return true;
  } catch (error) {
    console.error('Payment flow test failed:', error);
    return false;
  }
}

testPaymentFlow().then(success => {
  process.exit(success ? 0 : 1);
});
EOL

if node payment_test.js; then
  log_test "Payment Flow" "PASS" "Subscription and payment flow works correctly"
else
  log_test "Payment Flow" "FAIL" "Subscription and payment flow has issues"
fi

# Test 9: Test email provider integration
echo "Testing email provider integration..."
cd /home/ubuntu/moringa/system-tests
cat > email_provider_test.js << 'EOL'
const fetch = require('node-fetch');

async function testEmailProviderIntegration() {
  try {
    // Mock login to get token
    const token = 'test-token';
    
    // Test connecting a mailbox
    const connectResponse = await fetch('http://localhost:3000/api/mailboxes/connect', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        provider: 'gmail',
        email: 'test@gmail.com',
        accessToken: 'mock-access-token',
        refreshToken: 'mock-refresh-token'
      })
    });
    
    if (!connectResponse.ok) {
      throw new Error(`Mailbox connection failed: ${await connectResponse.text()}`);
    }
    
    console.log('Mailbox connection test passed');
    
    // Test fetching emails
    const emailsResponse = await fetch('http://localhost:3000/api/mailboxes/emails', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    });
    
    if (!emailsResponse.ok) {
      throw new Error(`Fetching emails failed: ${await emailsResponse.text()}`);
    }
    
    console.log('Fetching emails test passed');
    
    return true;
  } catch (error) {
    console.error('Email provider integration test failed:', error);
    return false;
  }
}

testEmailProviderIntegration().then(success => {
  process.exit(success ? 0 : 1);
});
EOL

if node email_provider_test.js; then
  log_test "Email Provider Integration" "PASS" "Email provider integration works correctly"
else
  log_test "Email Provider Integration" "FAIL" "Email provider integration has issues"
fi

# Test 10: Performance testing
echo "Running performance tests..."
cd /home/ubuntu/moringa/system-tests
cat > performance_test.js << 'EOL'
const fetch = require('node-fetch');
const { performance } = require('perf_hooks');

async function testPerformance() {
  try {
    // Mock login to get token
    const token = 'test-token';
    
    // Test API response times
    const endpoints = [
      { name: 'Email Draft', url: 'http://localhost:3000/api/email/draft', method: 'POST', body: { emailThread: 'Test', userIntent: 'Test' } },
      { name: 'Email Improve', url: 'http://localhost:3000/api/email/improve', method: 'POST', body: { emailThread: 'Test', userDraft: 'Test' } },
      { name: 'Email Summarize', url: 'http://localhost:3000/api/email/summarize', method: 'POST', body: { emailThread: 'Test' } }
    ];
    
    const results = {};
    const threshold = 2000; // 2 seconds threshold
    
    for (const endpoint of endpoints) {
      const start = performance.now();
      
      const response = await fetch(endpoint.url, {
        method: endpoint.method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(endpoint.body)
      });
      
      const end = performance.now();
      const time = end - start;
      
      results[endpoint.name] = {
        time,
        pass: time < threshold
      };
      
      console.log(`${endpoint.name}: ${time.toFixed(2)}ms (${results[endpoint.name].pass ? 'PASS' : 'FAIL'})`);
    }
    
    // Check if all tests passed
    return Object.values(results).every(result => result.pass);
  } catch (error) {
    console.error('Performance test failed:', error);
    return false;
  }
}

testPerformance().then(success => {
  process.exit(success ? 0 : 1);
});
EOL

if node performance_test.js; then
  log_test "Performance" "PASS" "API endpoints respond within acceptable time limits"
else
  log_test "Performance" "FAIL" "Some API endpoints are too slow"
fi

# Summarize test results
cd /home/ubuntu/moringa/system-tests
echo "" >> test_report.md
echo "# Summary" >> test_report.md
passed=$(grep -c "Status: PASS" test_report.md)
failed=$(grep -c "Status: FAIL" test_report.md)
total=$((passed + failed))
echo "Total tests: $total" >> test_report.md
echo "Passed: $passed" >> test_report.md
echo "Failed: $failed" >> test_report.md
echo "Success rate: $((passed * 100 / total))%" >> test_report.md

echo "============================================"
echo "System testing completed."
echo "Test report saved to /home/ubuntu/moringa/system-tests/test_report.md"
echo "Passed: $passed / $total tests"
