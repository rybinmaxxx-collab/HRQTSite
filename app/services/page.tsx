import type { Metadata } from "next";
import { Footer } from "@/components/Footer";
import { PageHero } from "@/components/PageShell";
import { ServiceGrid } from "@/components/Services";
import { Section } from "@/components/ui";
import { Process } from "@/components/sections";
import { services, servicesPage } from "@/content/site";

export const metadata: Metadata = {
  title: "Услуги",
  description:
    "Восемь направлений HRQT: WebSoft HCM, 1С ЗУП и данные, локальные ИИ-агенты, аудит и архитектурный надзор, аудит ИБ, порталы, карьерные сайты, собственные HR-сервисы.",
};

/**
 * Все направления.
 *
 * Появилась вместе с сокращением главной: там осталось шесть карточек из
 * восьми, и двум последним понадобился адрес. Страница — не свалка остатка, а
 * полный список: тот, кто пришёл по кнопке «Все услуги», ожидает увидеть
 * ровно всё, включая те шесть, что уже видел.
 *
 * Под сеткой — процесс работы, переехавший сюда с главной. Здесь он на месте:
 * человек, дочитавший до конца список услуг, как раз и спрашивает «а как вы
 * это делаете».
 */
export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow={servicesPage.eyebrow}
        titleLead={servicesPage.titleLead}
        titleAccent={servicesPage.titleAccent}
        lead={servicesPage.lead}
        breadcrumbs={[
          { label: "Главная", href: "/" },
          { label: "Услуги", href: "/services" },
        ]}
      />

      <Section>
        <ServiceGrid items={services.items} />
      </Section>

      <Process />
      <Footer />
    </>
  );
}
