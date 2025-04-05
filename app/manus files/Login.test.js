import { describe, it, expect, vi, beforeEach } from 'vitest';
import { mount } from '@vue/test-utils';
import { createRouter, createWebHistory } from 'vue-router';
import Login from '../src/views/Login.vue';

// Mock fetch
global.fetch = vi.fn();

// Mock router
const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/login', component: Login },
    { path: '/mailbox', component: { template: '<div>Mailbox</div>' } }
  ]
});

// Mock Tauri invoke
vi.mock('@tauri-apps/api/tauri', () => ({
  invoke: vi.fn()
}));

describe('Login.vue', () => {
  let wrapper;
  
  beforeEach(() => {
    vi.clearAllMocks();
    
    // Mock localStorage
    Storage.prototype.setItem = vi.fn();
    
    // Mock fetch response
    global.fetch.mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({
        token: 'mock-token',
        user: { id: 'user-123', email: 'test@example.com' }
      })
    });
    
    // Create wrapper
    wrapper = mount(Login, {
      global: {
        plugins: [router]
      }
    });
  });
  
  it('renders the login form correctly', () => {
    expect(wrapper.find('h1').text()).toBe('Moringa');
    expect(wrapper.find('p').text()).toBe('AI-Powered Email Assistant');
    expect(wrapper.find('button[type="submit"]').text()).toBe('Sign in');
    expect(wrapper.find('button[type="button"]').text()).toContain('Google');
  });
  
  it('updates form fields when user types', async () => {
    const emailInput = wrapper.find('#email');
    const passwordInput = wrapper.find('#password');
    
    await emailInput.setValue('test@example.com');
    await passwordInput.setValue('password123');
    
    expect(wrapper.vm.email).toBe('test@example.com');
    expect(wrapper.vm.password).toBe('password123');
  });
  
  it('calls the API when form is submitted', async () => {
    // Fill in form
    await wrapper.find('#email').setValue('test@example.com');
    await wrapper.find('#password').setValue('password123');
    
    // Submit form
    await wrapper.find('form').trigger('submit.prevent');
    
    // Check if fetch was called with correct parameters
    expect(global.fetch).toHaveBeenCalledWith(
      'https://moringa.app/api/auth/validate',
      expect.objectContaining({
        method: 'POST',
        headers: expect.objectContaining({
          'Content-Type': 'application/json'
        }),
        body: JSON.stringify({
          email: 'test@example.com',
          password: 'password123'
        })
      })
    );
  });
  
  it('stores token and user data in localStorage when login is successful', async () => {
    // Fill in form
    await wrapper.find('#email').setValue('test@example.com');
    await wrapper.find('#password').setValue('password123');
    
    // Submit form
    await wrapper.find('form').trigger('submit.prevent');
    
    // Wait for async operations
    await vi.runAllTimers();
    
    // Check if localStorage.setItem was called with correct parameters
    expect(localStorage.setItem).toHaveBeenCalledWith('auth_token', 'mock-token');
    expect(localStorage.setItem).toHaveBeenCalledWith(
      'user',
      JSON.stringify({ id: 'user-123', email: 'test@example.com' })
    );
  });
  
  it('navigates to mailbox when login is successful', async () => {
    const routerPushSpy = vi.spyOn(router, 'push');
    
    // Fill in form
    await wrapper.find('#email').setValue('test@example.com');
    await wrapper.find('#password').setValue('password123');
    
    // Submit form
    await wrapper.find('form').trigger('submit.prevent');
    
    // Wait for async operations
    await vi.runAllTimers();
    
    // Check if router.push was called with correct path
    expect(routerPushSpy).toHaveBeenCalledWith('/mailbox');
  });
  
  it('displays error message when login fails', async () => {
    // Mock fetch to return an error
    global.fetch.mockResolvedValue({
      ok: false,
      json: () => Promise.resolve({
        error: 'Invalid credentials'
      })
    });
    
    // Fill in form
    await wrapper.find('#email').setValue('test@example.com');
    await wrapper.find('#password').setValue('wrong-password');
    
    // Submit form
    await wrapper.find('form').trigger('submit.prevent');
    
    // Wait for async operations
    await vi.runAllTimers();
    
    // Check if error message is displayed
    expect(wrapper.vm.error).toBe('Invalid credentials');
    expect(wrapper.find('.bg-red-100').exists()).toBe(true);
    expect(wrapper.find('.bg-red-100').text()).toBe('Invalid credentials');
  });
  
  it('disables form submission while loading', async () => {
    // Fill in form
    await wrapper.find('#email').setValue('test@example.com');
    await wrapper.find('#password').setValue('password123');
    
    // Set loading state
    wrapper.vm.isLoading = true;
    await wrapper.vm.$nextTick();
    
    // Check if submit button is disabled
    const submitButton = wrapper.find('button[type="submit"]');
    expect(submitButton.attributes('disabled')).toBeDefined();
    expect(submitButton.text()).toBe('Signing in...');
  });
});
