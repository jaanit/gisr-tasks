

import { z } from "zod";

export const Loginschema = z.object({
  email: z.string().email({ message: "Email invalide" }),
  password: z.string().min(1, { message: "Mot de passe requis" }),
});

export const UserSchema = z.object({
  name: z.string().min(1, { message: "Nom requis" }),
  email: z.string().email({ message: "Email invalide" }),
  password: z.string().min(6, { message: "Le mot de passe doit comporter au moins 6 caractères" }),
});

export const UsecaseSchema = z.object({
  nom: z.string().min(2, { message: "Ce champ est obligatoire" }),
  description: z.string().min(2, { message: "Ce champ est obligatoire" }),
  date_creation: z.date().refine((date) => !isNaN(date.getTime()), {
    message: "Format de date invalide. Veuillez fournir une date valide.",
  }),
  date_mep: z
    .date()
    .refine((date) => !isNaN(date.getTime()), {
      message: "Format de date invalide. Veuillez fournir une date valide.",
    })
    .nullable(),
  statut: z.string(),
});

export const ApiSchema = z.object({
  nom: z.string().min(2, { message: "Ce champ est obligatoire" }),
  producteur: z.string().min(2, { message: "le nom producteur est obligatoire" }),
  description: z.string(),
  date_creation: z.date().refine((date) => !isNaN(date.getTime()), {
    message: "Format de date invalide. Veuillez fournir une date valide.",
  }),
  date_uat: z.date()
  .refine((date) => !isNaN(date.getTime()), {
    message: "Format de date invalide. Veuillez fournir une date valide.",
  })
  .nullable(),
  date_prod: z
    .date()
    .refine((date) => !isNaN(date.getTime()), {
      message: "Format de date invalide. Veuillez fournir une date valide.",
    })
    .nullable(),
  statut: z.string(),
});

// Producteur Schemas
export const ProducteurEndPointSchema = z.object({
  nom_end_point: z.string().min(2, { message: "Ce champ est obligatoire" }),
  url: z.string().url({ message: "URL invalide" }),
  uat:  z.date().refine((date) => !isNaN(date.getTime()), {
    message: "Format de date invalide. Veuillez fournir une date valide.",
  }),
  prod:  z.date().refine((date) => !isNaN(date.getTime()), {
    message: "Format de date invalide. Veuillez fournir une date valide.",
  }).nullable(),
});

export const ProducteurDocumentSchema = z.object({
  type_document: z.string().min(2, { message: "Ce champ est obligatoire" }),
  description: z.string().min(2, { message: "Ce champ est obligatoire" }),
  date_ajout: z.date().refine((date) => !isNaN(date.getTime()), {
    message: "Format de date invalide. Veuillez fournir une date valide.",
  }),
});

export const ProducteurContactSchema = z.object({
  type_interlocuteur: z.string().min(2, { message: "Ce champ est obligatoire" }),
  nom_complet: z.string(),
  email: z.string().email({ message: "Email invalide" }),
  num_telephone: z.string().length(10, { message: "Num de tél invalide" }).regex(/^\d+$/, { message: "Numéro de téléphone invalide" }).or(z.string().length(0)),
});

// Consommateur Schemas
export const ConsommateurEndPointSchema = z.object({
  administration: z.string().min(2, { message: "Ce champ est obligatoire" }),
  nom_end_point: z.string().min(2, { message: "Ce champ est obligatoire" }),
  url: z.string().url({ message: "URL invalide" }),
  uat:  z.date().refine((date) => !isNaN(date.getTime()), {
    message: "Format de date invalide. Veuillez fournir une date valide.",
  }),
  prod:  z.date().refine((date) => !isNaN(date.getTime()), {
    message: "Format de date invalide. Veuillez fournir une date valide.",
  }).nullable(),
});

export const ConsommateurDocumentSchema = z.object({
  administration: z.string().min(2, { message: "Ce champ est obligatoire" }),
  type_document: z.string().min(2, { message: "Ce champ est obligatoire" }),
  description: z.string().min(2, { message: "Ce champ est obligatoire" }),
  date_ajout: z.date().refine((date) => !isNaN(date.getTime()), {
    message: "Format de date invalide. Veuillez fournir une date valide.",
  }),
});

export const ConsommateurContactSchema = z.object({
  administration: z.string().min(2, { message: "Ce champ est obligatoire" }),
  type_interlocuteur: z.string().min(2, { message: "Ce champ est obligatoire" }),
  nom_complet: z.string(),
  email: z.string().email({ message: "Email invalide" }),
  num_telephone: z.string().length(10, { message: "Num de tél invalide" }).regex(/^\d+$/, { message: "Numéro de téléphone invalide" }).or(z.string().length(0)),
});