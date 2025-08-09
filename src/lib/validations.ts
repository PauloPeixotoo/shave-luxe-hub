import { z } from "zod";

// Schema para formulário de contato
export const contactSchema = z.object({
  name: z.string().min(2, "Nome deve ter pelo menos 2 caracteres"),
  email: z.string().email("Email inválido").optional().or(z.literal("")),
  phone: z.string().min(10, "Telefone deve ter pelo menos 10 dígitos"),
  subject: z.string().min(3, "Assunto deve ter pelo menos 3 caracteres"),
  message: z.string().min(10, "Mensagem deve ter pelo menos 10 caracteres")
});

// Schema para formulário de agendamento
export const bookingSchema = z.object({
  client_name: z.string().min(2, "Nome deve ter pelo menos 2 caracteres"),
  client_phone: z.string().min(10, "Telefone deve ter pelo menos 10 dígitos"),
  client_email: z.string().email("Email inválido").optional().or(z.literal("")),
  service_id: z.string().min(1, "Selecione um serviço"),
  barber_id: z.string().min(1, "Selecione um barbeiro"),
  date: z.string().min(1, "Selecione uma data"),
  time: z.string().min(1, "Selecione um horário"),
  notes: z.string().optional()
});

// Schema para login
export const loginSchema = z.object({
  email: z.string().email("Email inválido"),
  password: z.string().min(6, "Senha deve ter pelo menos 6 caracteres")
});

// Schema para atualização de status
export const statusUpdateSchema = z.object({
  bookingId: z.string().min(1, "ID do agendamento é obrigatório"),
  newStatus: z.enum(["pending", "confirmed", "completed", "cancelled"])
});

// Tipos derivados dos schemas
export type ContactFormData = z.infer<typeof contactSchema>;
export type BookingFormData = z.infer<typeof bookingSchema>;
export type LoginFormData = z.infer<typeof loginSchema>;
export type StatusUpdateData = z.infer<typeof statusUpdateSchema>;
