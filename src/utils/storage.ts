import { Message } from '../types/message';
import { supabase } from './supabase';

export const saveMessage = async (message: Message): Promise<void> => {
  await supabase
    .from('messages')
    .insert([message]);
};

export const getMessages = async (): Promise<Message[]> => {
  const { data, error } = await supabase
    .from('messages')
    .select('*')
    .order('timestamp', { ascending: true });
  
  if (error) {
    console.error('Error fetching messages:', error);
    return [];
  }
  
  return data || [];
};

export const subscribeToMessages = (callback: (messages: Message[]) => void) => {
  return supabase
    .channel('messages')
    .on('postgres_changes', { 
      event: '*', 
      schema: 'public', 
      table: 'messages' 
    }, () => {
      getMessages().then(callback);
    })
    .subscribe();
};