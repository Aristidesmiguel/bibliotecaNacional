"use client";

import { Mail, Phone, MapPin } from "lucide-react";
import React, { useState, useRef, useEffect } from "react";
import { toast } from "sonner";

export const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);

  const formRef = useRef<HTMLDivElement>(null);
  const [formHeight, setFormHeight] = useState<number | null>(null);

  useEffect(() => {
    function updateHeight() {
      if (formRef.current) {
        setFormHeight(formRef.current.offsetHeight);
      }
    }
    updateHeight();
    window.addEventListener("resize", updateHeight);
    return () => window.removeEventListener("resize", updateHeight);
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      toast.error("Por favor, preencha todos os campos.");
      return;
    }
    try {
      setLoading(true);
      await new Promise((r) => setTimeout(r, 1500));
      toast.success("Mensagem enviada com sucesso!");
      setFormData({ name: "", email: "", message: "" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#f8f9fa] text-[#333] flex flex-col items-center justify-start px-6 py-12">
      {/* Título Centralizado */}
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold mb-2 text-[#1f2937]">
          Entre em Contato
        </h1>
        <p className="text-gray-600 text-sm font-light">
          Vamos conversar sobre como podemos transformar seu negócio
        </p>
      </div>

      {/* Formulário + Informações */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-5xl">
        {/* Formulário */}
        <div
          ref={formRef}
          className="bg-white rounded-2xl p-8 border border-gray-300 shadow-md"
        >
          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            {/* Nome */}
            <div className="flex flex-col gap-2">
              <label htmlFor="name" className="text-sm font-semibold text-[#1f2937]">
                Nome
              </label>
              <input
                type="text"
                name="name"
                placeholder="Seu nome completo"
                value={formData.name}
                onChange={handleChange}
                className="w-full p-3 bg-[#fefefe] border border-gray-300 rounded-lg text-[#333] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#1f2937] transition-all"
              />
            </div>

            {/* Email */}
            <div className="flex flex-col gap-2">
              <label htmlFor="email" className="text-sm font-semibold text-[#1f2937]">
                Email
              </label>
              <input
                type="email"
                name="email"
                placeholder="seu@email.com"
                value={formData.email}
                onChange={handleChange}
                className="w-full p-3 bg-[#fefefe] border border-gray-300 rounded-lg text-[#333] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#1f2937] transition-all"
              />
            </div>

            {/* Mensagem */}
            <div className="flex flex-col gap-2">
              <label htmlFor="message" className="text-sm font-semibold text-[#1f2937]">
                Mensagem
              </label>
              <textarea
                name="message"
                placeholder="Conte-nos sobre seu projeto..."
                value={formData.message}
                onChange={handleChange}
                rows={4}
                className="w-full p-3 bg-[#fefefe] border border-gray-300 rounded-lg text-[#333] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#1f2937] transition-all resize-none"
              />
            </div>

            {/* Botão */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#1f2937] hover:bg-[#111827] text-white font-medium py-3 rounded-lg transition-all shadow-md"
            >
              {loading ? "Enviando..." : "Enviar Mensagem"}
            </button>
          </form>
        </div>

        {/* Informações de Contato */}
        <div
          className="flex flex-col gap-2 bg-white rounded-2xl p-6 border border-gray-300 shadow-md"
          style={{ height: formHeight ?? "auto" }}
        >
          <div className="flex items-start gap-4 p-4 rounded-lg border border-gray-300 hover:border-[#1f2937] transition-all flex-grow">
            <div className="p-2 rounded-lg bg-gradient-to-br from-[#1f2937] to-[#4b5563]">
              <Mail className="w-6 h-6 text-white" />
            </div>
            <div className="flex flex-col justify-center">
              <h3 className="font-semibold text-lg text-[#1f2937]">Email</h3>
              <p className="text-gray-600 text-sm">www.bibliotecanacional.com</p>
              <p className="text-gray-600 text-sm">www.bibliotecanacional.com</p>
            </div>
          </div>

          <div className="flex items-start gap-4 p-4 rounded-lg border border-gray-300 hover:border-[#1f2937] transition-all flex-grow">
            <div className="p-2 rounded-lg bg-gradient-to-br from-[#1f2937] to-[#4b5563]">
              <Phone className="w-6 h-6 text-white" />
            </div>
            <div className="flex flex-col justify-center">
              <h3 className="font-semibold text-lg text-[#1f2937]">Telefone</h3>
              <p className="text-gray-600 text-sm">+244 (9) 935 555 500</p>
              <p className="text-gray-600 text-sm">+244 (9) 935 555 600</p>
            </div>
          </div>

          <div className="flex items-start gap-4 p-4 rounded-lg border border-gray-300 hover:border-[#1f2937] transition-all flex-grow">
            <div className="p-2 rounded-lg bg-gradient-to-br from-[#1f2937] to-[#4b5563]">
              <MapPin className="w-6 h-6 text-white" />
            </div>
            <div className="flex flex-col justify-center">
              <h3 className="font-semibold text-lg text-[#1f2937]">Localização</h3>
              <p className="text-gray-600 text-sm">Lunada, LD</p>
              <p className="text-gray-600 text-sm">Angola</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
