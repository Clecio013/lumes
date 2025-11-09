'use client';

import { useState } from 'react';
import { User, Mail, Phone, Calendar, FileText } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import {
  validateCPF,
  validatePhone,
  validateAge,
  validateEmail,
  formatCPF,
  formatPhone,
} from '@/lib/validators/brazilian-validators';

export interface PersonalData {
  fullName: string;
  email: string;
  phone: string;
  birthdate: string; // YYYY-MM-DD
  cpf: string;
}

interface PersonalDataFormProps {
  data: PersonalData;
  onChange: (data: PersonalData) => void;
  errors: Partial<Record<keyof PersonalData, string>>;
  onValidate: (field: keyof PersonalData) => void;
}

export function PersonalDataForm({ data, onChange, errors, onValidate }: PersonalDataFormProps) {
  const [touched, setTouched] = useState<Partial<Record<keyof PersonalData, boolean>>>({});

  // Formatar CPF e telefone ao digitar
  const handleCPFChange = (value: string) => {
    const cleaned = value.replace(/\D/g, '');
    if (cleaned.length <= 11) {
      onChange({ ...data, cpf: formatCPF(cleaned) });
    }
  };

  const handlePhoneChange = (value: string) => {
    const cleaned = value.replace(/\D/g, '');
    if (cleaned.length <= 11) {
      onChange({ ...data, phone: formatPhone(cleaned) });
    }
  };

  const handleBlur = (field: keyof PersonalData) => {
    setTouched({ ...touched, [field]: true });
    onValidate(field);
  };

  const showError = (field: keyof PersonalData) => touched[field] && errors[field];

  return (
    <div className="space-y-4">
      <h3 className="checkout-label mb-4">Dados Pessoais</h3>

      {/* Nome Completo */}
      <div>
        <Label htmlFor="fullName" className="checkout-label mb-2">
          Nome Completo
        </Label>
        <div className="relative">
          <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5" style={{ color: '#d4af37' }} />
          <Input
            type="text"
            id="fullName"
            value={data.fullName}
            onChange={(e) => onChange({ ...data, fullName: e.target.value })}
            onBlur={() => handleBlur('fullName')}
            placeholder="Maria da Silva"
            className={`
              checkout-input pl-12
              ${
                showError('fullName')
                  ? '!border-red-500 !bg-red-500/10'
                  : ''
              }
            `}
          />
        </div>
        {showError('fullName') && (
          <p className="mt-1 text-sm text-red-500">{errors.fullName}</p>
        )}
      </div>

      {/* Email */}
      <div>
        <Label htmlFor="email" className="checkout-label mb-2">
          Email
        </Label>
        <div className="relative">
          <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5" style={{ color: '#d4af37' }} />
          <Input
            type="email"
            id="email"
            value={data.email}
            onChange={(e) => onChange({ ...data, email: e.target.value })}
            onBlur={() => handleBlur('email')}
            placeholder="maria@example.com"
            className={`
              checkout-input pl-12
              ${
                showError('email')
                  ? '!border-red-500 !bg-red-500/10'
                  : ''
              }
            `}
          />
        </div>
        {showError('email') && (
          <p className="mt-1 text-sm text-red-500">{errors.email}</p>
        )}
      </div>

      {/* Telefone */}
      <div>
        <Label htmlFor="phone" className="checkout-label mb-2">
          Telefone
        </Label>
        <div className="relative">
          <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5" style={{ color: '#d4af37' }} />
          <Input
            type="tel"
            id="phone"
            value={data.phone}
            onChange={(e) => handlePhoneChange(e.target.value)}
            onBlur={() => handleBlur('phone')}
            placeholder="(11) 98765-4321"
            className={`
              checkout-input pl-12
              ${
                showError('phone')
                  ? '!border-red-500 !bg-red-500/10'
                  : ''
              }
            `}
          />
        </div>
        {showError('phone') && (
          <p className="mt-1 text-sm text-red-500">{errors.phone}</p>
        )}
      </div>

      {/* Data de Nascimento */}
      <div>
        <Label htmlFor="birthdate" className="checkout-label mb-2">
          Data de Nascimento
        </Label>
        <div className="relative">
          <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5" style={{ color: '#d4af37' }} />
          <Input
            type="date"
            id="birthdate"
            value={data.birthdate}
            onChange={(e) => onChange({ ...data, birthdate: e.target.value })}
            onBlur={() => handleBlur('birthdate')}
            max={new Date(Date.now() - 18 * 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]}
            className={`
              checkout-input pl-12
              ${
                showError('birthdate')
                  ? '!border-red-500 !bg-red-500/10'
                  : ''
              }
            `}
          />
        </div>
        {showError('birthdate') && (
          <p className="mt-1 text-sm text-red-500">{errors.birthdate}</p>
        )}
        <p className="mt-1 text-xs text-[#a8a8a8]">Você precisa ter pelo menos 18 anos</p>
      </div>

      {/* CPF */}
      <div>
        <Label htmlFor="cpf" className="checkout-label mb-2">
          CPF
        </Label>
        <div className="relative">
          <FileText className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5" style={{ color: '#d4af37' }} />
          <Input
            type="text"
            id="cpf"
            value={data.cpf}
            onChange={(e) => handleCPFChange(e.target.value)}
            onBlur={() => handleBlur('cpf')}
            placeholder="000.000.000-00"
            className={`
              checkout-input pl-12
              ${
                showError('cpf')
                  ? '!border-red-500 !bg-red-500/10'
                  : ''
              }
            `}
          />
        </div>
        {showError('cpf') && (
          <p className="mt-1 text-sm text-red-500">{errors.cpf}</p>
        )}
      </div>
    </div>
  );
}
