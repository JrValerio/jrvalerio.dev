import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { FiMail, FiPhone, FiMapPin } from "react-icons/fi";

const Contact: React.FC = () => {
  const { t } = useTranslation();
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setForm({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      message: "",
    });
  };

  return (
    <main className="flex min-h-screen justify-center items-center bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 px-2">
      <section className="flex flex-col md:flex-row gap-8 w-full max-w-6xl">
        {/* Formulário */}
        <div className="flex-1 rounded-2xl bg-gray-900/90 shadow-lg p-8">
          <h2 className="text-3xl font-bold text-blue-500 mb-1">{t("contact.title")}</h2>
          <p className="text-gray-300 mb-8 text-sm">{t("contact.subtitle")}</p>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="flex flex-col md:flex-row gap-4">
              <input
                className="bg-gray-800 rounded px-4 py-2 text-white w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                type="text"
                name="firstName"
                placeholder={t("contact.form.firstName")}
                value={form.firstName}
                onChange={handleChange}
                required
                autoComplete="given-name"
              />
              <input
                className="bg-gray-800 rounded px-4 py-2 text-white w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                type="text"
                name="lastName"
                placeholder={t("contact.form.lastName")}
                value={form.lastName}
                onChange={handleChange}
                required
                autoComplete="family-name"
              />
            </div>
            <div className="flex flex-col md:flex-row gap-4">
              <input
                className="bg-gray-800 rounded px-4 py-2 text-white w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                type="email"
                name="email"
                placeholder={t("contact.form.email")}
                value={form.email}
                onChange={handleChange}
                required
                autoComplete="email"
              />
              <input
                className="bg-gray-800 rounded px-4 py-2 text-white w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                type="tel"
                name="phone"
                placeholder={t("contact.form.phone")}
                value={form.phone}
                onChange={handleChange}
                autoComplete="tel"
              />
            </div>
            <textarea
              className="bg-gray-800 rounded px-4 py-2 text-white h-32 focus:outline-none focus:ring-2 focus:ring-blue-500"
              name="message"
              placeholder={t("contact.form.message")}
              value={form.message}
              onChange={handleChange}
              required
            />
            <button
              type="submit"
              className="bg-gradient-to-r from-blue-600 to-teal-400 hover:from-blue-500 hover:to-teal-300 transition text-white font-semibold rounded-lg py-3 mt-2"
            >
              {t("contact.form.button")}
            </button>
          </form>
        </div>

        {/* Informações */}
        <div className="flex-1 bg-gray-900/90 rounded-2xl p-8 shadow-lg flex flex-col gap-8 justify-between min-h-[350px] max-h-full">
          <div>
            <h3 className="text-blue-500 text-2xl font-bold mb-8">{t("contact.infoTitle")}</h3>
            <ul className="flex flex-col gap-6 text-base text-white">
              <li className="flex items-center gap-2">
                <FiPhone className="text-blue-400 text-lg" />
                <span className="font-bold">{t("contact.phone")}:</span>
                <a
                  href="https://wa.me/5511960757716"
                  className="text-gray-300 hover:text-teal-400 ml-2"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  +55 11 96075-7716
                </a>
              </li>
              <li className="flex items-center gap-2">
                <FiMail className="text-blue-400 text-lg" />
                <span className="font-bold">{t("contact.email")}:</span>
                <a
                  href="mailto:amarovsjr81@gmail.com"
                  className="text-gray-300 hover:text-teal-400 ml-2"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  amarovsjr81@gmail.com
                </a>
              </li>
              <li className="flex items-center gap-2">
                <FiMapPin className="text-blue-400 text-lg" />
                <span className="font-bold">{t("contact.address")}:</span>
                <span className="text-gray-300 ml-2">{t("contact.addressText")}</span>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Contact;
