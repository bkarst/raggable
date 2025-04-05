import { describe, it, expect, vi, beforeEach } from 'vitest';
import { mount } from '@vue/test-utils';
import { createRouter, createWebHistory } from 'vue-router';
import Compose from '../src/views/Compose.vue';

// Mock fetch
global.fetch = vi.fn();

// Mock router
const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/mailbox', component: { template: '<div>Mailbox</div>' } },
    { path: '/compose', component: Compose }
  ]
});

describe('Compose.vue', () => {
  let wrapper;
  
  beforeEach(() => {
    vi.clearAllMocks();
    
    // Mock localStorage
    Storage.prototype.getItem = vi.fn().mockReturnValue('mock-token');
    
    // Mock fetch response
    global.fetch.mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({
        draft: 'AI generated draft',
        tokensUsed: 150
      })
    });
    
    // Create wrapper
    wrapper = mount(Compose, {
      global: {
        plugins: [router]
      }
    });
  });
  
  it('renders the compose form correctly', () => {
    expect(wrapper.find('h1').text()).toContain('New Message');
    expect(wrapper.find('button[type="submit"]').text()).toContain('Send');
    expect(wrapper.find('button[type="button"]').text()).toContain('Cancel');
  });
  
  it('updates form fields when user types', async () => {
    const toInput = wrapper.find('#to');
    const subjectInput = wrapper.find('#subject');
    const messageTextarea = wrapper.find('#message');
    
    await toInput.setValue('recipient@example.com');
    await subjectInput.setValue('Test Subject');
    await messageTextarea.setValue('Test message content');
    
    expect(wrapper.vm.to).toBe('recipient@example.com');
    expect(wrapper.vm.subject).toBe('Test Subject');
    expect(wrapper.vm.message).toBe('Test message content');
  });
  
  it('shows CC/BCC fields when "Add Cc/Bcc" is clicked', async () => {
    // Initially CC/BCC fields should be hidden
    expect(wrapper.find('#cc').exists()).toBe(false);
    expect(wrapper.find('#bcc').exists()).toBe(false);
    
    // Click the "Add Cc/Bcc" button
    await wrapper.find('button.text-primary-600').trigger('click');
    
    // Now CC/BCC fields should be visible
    expect(wrapper.find('#cc').exists()).toBe(true);
    expect(wrapper.find('#bcc').exists()).toBe(true);
  });
  
  it('calls the API to generate a draft when "Generate" button is clicked', async () => {
    // Set intent
    await wrapper.find('#intent').setValue('Respond positively to the meeting request');
    
    // Click generate button
    await wrapper.find('button:contains("Generate")').trigger('click');
    
    // Check if fetch was called with correct parameters
    expect(global.fetch).toHaveBeenCalledWith(
      'https://moringa.app/api/email/draft',
      expect.objectContaining({
        method: 'POST',
        headers: expect.objectContaining({
          'Content-Type': 'application/json',
          'Authorization': 'Bearer mock-token'
        }),
        body: expect.any(String)
      })
    );
    
    // Check if the message was updated with the generated draft
    await vi.runAllTimers(); // Wait for async operations
    expect(wrapper.vm.message).toBe('AI generated draft');
  });
  
  it('calls the API to improve a message when "Improve this message" button is clicked', async () => {
    // Set message
    await wrapper.find('#message').setValue('Draft to improve');
    
    // Click improve button
    await wrapper.find('button:contains("Improve this message")').trigger('click');
    
    // Check if fetch was called with correct parameters
    expect(global.fetch).toHaveBeenCalledWith(
      'https://moringa.app/api/email/improve',
      expect.objectContaining({
        method: 'POST',
        headers: expect.objectContaining({
          'Content-Type': 'application/json',
          'Authorization': 'Bearer mock-token'
        }),
        body: expect.any(String)
      })
    );
  });
  
  it('navigates back to mailbox when cancel button is clicked', async () => {
    const routerPushSpy = vi.spyOn(router, 'push');
    
    // Click cancel button
    await wrapper.find('button:contains("Cancel")').trigger('click');
    
    // Check if router.push was called with correct path
    expect(routerPushSpy).toHaveBeenCalledWith('/mailbox');
  });
  
  it('disables the send button when required fields are empty', async () => {
    const sendButton = wrapper.find('button:contains("Send")');
    
    // Initially all fields are empty, so button should be disabled
    expect(sendButton.attributes('disabled')).toBeDefined();
    
    // Fill in required fields
    await wrapper.find('#to').setValue('recipient@example.com');
    await wrapper.find('#subject').setValue('Test Subject');
    await wrapper.find('#message').setValue('Test message content');
    
    // Now button should be enabled
    expect(sendButton.attributes('disabled')).toBeUndefined();
  });
  
  it('handles API errors gracefully', async () => {
    // Mock fetch to return an error
    global.fetch.mockResolvedValue({
      ok: false,
      json: () => Promise.resolve({
        error: 'Failed to generate draft'
      })
    });
    
    // Set intent
    await wrapper.find('#intent').setValue('Respond positively to the meeting request');
    
    // Click generate button
    await wrapper.find('button:contains("Generate")').trigger('click');
    
    // Check if error handling works
    await vi.runAllTimers(); // Wait for async operations
    expect(wrapper.vm.isGenerating).toBe(false);
    
    // In a real component, we would check for error message display
    // but this depends on how errors are shown in the UI
  });
});
