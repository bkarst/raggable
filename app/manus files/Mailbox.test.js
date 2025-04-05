import { describe, it, expect, vi, beforeEach } from 'vitest';
import { mount } from '@vue/test-utils';
import { createRouter, createWebHistory } from 'vue-router';
import Mailbox from '../src/views/Mailbox.vue';

// Mock router
const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/mailbox', component: Mailbox },
    { path: '/compose', component: { template: '<div>Compose</div>' } },
    { path: '/settings', component: { template: '<div>Settings</div>' } }
  ]
});

describe('Mailbox.vue', () => {
  let wrapper;
  
  beforeEach(() => {
    vi.clearAllMocks();
    
    // Create wrapper
    wrapper = mount(Mailbox, {
      global: {
        plugins: [router]
      }
    });
  });
  
  it('renders the mailbox interface correctly', () => {
    // Check sidebar elements
    expect(wrapper.find('h1').text()).toBe('Moringa');
    expect(wrapper.findAll('button:contains("Compose")').length).toBe(1);
    expect(wrapper.findAll('button:contains("Settings")').length).toBe(1);
    
    // Check mailbox list
    const mailboxButtons = wrapper.findAll('.mailboxes button');
    expect(mailboxButtons.length).toBe(2);
    expect(mailboxButtons[0].text()).toContain('Personal Gmail');
    expect(mailboxButtons[1].text()).toContain('Work Outlook');
    
    // Check folder list
    const folderButtons = wrapper.findAll('.folders button');
    expect(folderButtons.length).toBe(4);
    expect(folderButtons[0].text()).toContain('Inbox');
    expect(folderButtons[1].text()).toContain('Sent');
    expect(folderButtons[2].text()).toContain('Drafts');
    expect(folderButtons[3].text()).toContain('Trash');
  });
  
  it('displays emails in the email list', () => {
    const emailItems = wrapper.findAll('.email-list .email-item');
    expect(emailItems.length).toBe(3);
    
    // Check first email
    expect(emailItems[0].text()).toContain('John Doe');
    expect(emailItems[0].text()).toContain('Project Update - Q2 Goals');
  });
  
  it('selects an email when clicked', async () => {
    // Initially no email should be selected
    expect(wrapper.vm.selectedEmail).toBeNull();
    
    // Click the first email
    const firstEmail = wrapper.findAll('.email-list .email-item')[0];
    await firstEmail.trigger('click');
    
    // Now the first email should be selected
    expect(wrapper.vm.selectedEmail).not.toBeNull();
    expect(wrapper.vm.selectedEmail.id).toBe(1);
    expect(wrapper.vm.selectedEmail.subject).toBe('Project Update - Q2 Goals');
    
    // Email content should be displayed
    const emailContent = wrapper.find('.email-content');
    expect(emailContent.text()).toContain('John Doe');
    expect(emailContent.text()).toContain('Project Update - Q2 Goals');
    expect(emailContent.html()).toContain('<p>Hi team,</p>');
  });
  
  it('marks an email as read when selected', async () => {
    // First email is initially unread
    expect(wrapper.vm.emails[0].unread).toBe(true);
    
    // Click the first email
    const firstEmail = wrapper.findAll('.email-list .email-item')[0];
    await firstEmail.trigger('click');
    
    // Now it should be marked as read
    expect(wrapper.vm.emails[0].unread).toBe(false);
    
    // Unread count should be updated
    expect(wrapper.vm.selectedMailbox.unread).toBe(2);
    expect(wrapper.vm.selectedFolder.unread).toBe(2);
  });
  
  it('navigates to compose when Compose button is clicked', async () => {
    const routerPushSpy = vi.spyOn(router, 'push');
    
    // Click Compose button
    await wrapper.find('button:contains("Compose")').trigger('click');
    
    // Check if router.push was called with correct path
    expect(routerPushSpy).toHaveBeenCalledWith('/compose');
  });
  
  it('navigates to settings when Settings button is clicked', async () => {
    const routerPushSpy = vi.spyOn(router, 'push');
    
    // Click Settings button
    await wrapper.find('button:contains("Settings")').trigger('click');
    
    // Check if router.push was called with correct path
    expect(routerPushSpy).toHaveBeenCalledWith('/settings');
  });
  
  it('navigates to compose with reply parameters when Reply button is clicked', async () => {
    const routerPushSpy = vi.spyOn(router, 'push');
    
    // First select an email
    const firstEmail = wrapper.findAll('.email-list .email-item')[0];
    await firstEmail.trigger('click');
    
    // Click Reply button
    await wrapper.find('button[title="Reply"]').trigger('click');
    
    // Check if router.push was called with correct parameters
    expect(routerPushSpy).toHaveBeenCalledWith({
      path: '/compose',
      query: {
        action: 'reply',
        id: 1
      }
    });
  });
  
  it('navigates to compose with forward parameters when Forward button is clicked', async () => {
    const routerPushSpy = vi.spyOn(router, 'push');
    
    // First select an email
    const firstEmail = wrapper.findAll('.email-list .email-item')[0];
    await firstEmail.trigger('click');
    
    // Click Forward button
    await wrapper.find('button[title="Forward"]').trigger('click');
    
    // Check if router.push was called with correct parameters
    expect(routerPushSpy).toHaveBeenCalledWith({
      path: '/compose',
      query: {
        action: 'forward',
        id: 1
      }
    });
  });
  
  it('deletes an email when Delete button is clicked', async () => {
    // Initially there are 3 emails
    expect(wrapper.vm.emails.length).toBe(3);
    
    // First select an email
    const firstEmail = wrapper.findAll('.email-list .email-item')[0];
    await firstEmail.trigger('click');
    
    // Click Delete button
    await wrapper.find('button[title="Delete"]').trigger('click');
    
    // Now there should be 2 emails
    expect(wrapper.vm.emails.length).toBe(2);
    
    // The selected email should be null
    expect(wrapper.vm.selectedEmail).toBeNull();
  });
  
  it('switches mailbox when a different mailbox is selected', async () => {
    // Initially the first mailbox is selected
    expect(wrapper.vm.selectedMailbox.id).toBe(1);
    
    // Click the second mailbox
    const secondMailbox = wrapper.findAll('.mailboxes button')[1];
    await secondMailbox.trigger('click');
    
    // Now the second mailbox should be selected
    expect(wrapper.vm.selectedMailbox.id).toBe(2);
  });
  
  it('switches folder when a different folder is selected', async () => {
    // Initially the first folder (Inbox) is selected
    expect(wrapper.vm.selectedFolder.id).toBe(1);
    
    // Click the second folder (Sent)
    const sentFolder = wrapper.findAll('.folders button')[1];
    await sentFolder.trigger('click');
    
    // Now the second folder should be selected
    expect(wrapper.vm.selectedFolder.id).toBe(2);
  });
});
