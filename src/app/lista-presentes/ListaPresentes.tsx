'use client'
import { useState, useCallback, useEffect } from 'react'
import type { ReactElement } from 'react'
import PageHeader from '@/components/PageHeader'
import { supabase } from '@/lib/supabase'

const PIX_KEY = '47999110047'
const MAX_COTAS = 10

// ─── SVG Icons ─────────────────────────────────────────────────────────────
const G = '#B87040'
const C = '#EDE4D8'

const icons: Record<string, ReactElement> = {
  cafe: (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="22" cy="38" rx="12" ry="3" fill={G} opacity=".18" />
      <rect x="10" y="18" width="24" height="18" rx="4" fill={C} stroke={G} strokeWidth="1.5" />
      <path d="M34 22h3a4 4 0 0 1 0 8h-3" stroke={G} strokeWidth="1.5" strokeLinecap="round" />
      <rect x="14" y="36" width="16" height="2.5" rx="1.25" fill={G} opacity=".4" />
      <path d="M18 14c0-2 2-2 2-4M24 14c0-2 2-2 2-4" stroke={G} strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  ),
  avental: (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M16 10h16l-2 28H18L16 10Z" fill={C} stroke={G} strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M16 10c0-3 3-5 8-5s8 2 8 5" stroke={G} strokeWidth="1.5" strokeLinecap="round" />
      <rect x="20" y="13" width="8" height="5" rx="2" fill={G} opacity=".25" />
      <path d="M20 24h8M20 29h6" stroke={G} strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  ),
  tabua: (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="8" y="14" width="28" height="20" rx="3" fill={C} stroke={G} strokeWidth="1.5" />
      <rect x="36" y="20" width="6" height="8" rx="3" fill={G} opacity=".35" stroke={G} strokeWidth="1.2" />
      <circle cx="22" cy="24" r="6" fill={G} opacity=".15" stroke={G} strokeWidth="1.2" />
      <path d="M19 24h6M22 21v6" stroke={G} strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  ),
  sal: (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="16" y="12" width="16" height="26" rx="8" fill={C} stroke={G} strokeWidth="1.5" />
      <rect x="20" y="8" width="8" height="6" rx="2" fill={G} opacity=".3" stroke={G} strokeWidth="1.2" />
      <circle cx="24" cy="27" r="2" fill={G} opacity=".4" />
      <circle cx="20" cy="23" r="1.2" fill={G} opacity=".3" />
      <circle cx="28" cy="23" r="1.2" fill={G} opacity=".3" />
      <circle cx="20" cy="31" r="1.2" fill={G} opacity=".3" />
      <circle cx="28" cy="31" r="1.2" fill={G} opacity=".3" />
    </svg>
  ),
  chocolate: (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="8" y="14" width="32" height="22" rx="4" fill={C} stroke={G} strokeWidth="1.5" />
      <line x1="8" y1="22" x2="40" y2="22" stroke={G} strokeWidth="1.2" />
      <line x1="8" y1="30" x2="40" y2="30" stroke={G} strokeWidth="1.2" />
      <line x1="18" y1="14" x2="18" y2="36" stroke={G} strokeWidth="1.2" />
      <line x1="30" y1="14" x2="30" y2="36" stroke={G} strokeWidth="1.2" />
    </svg>
  ),
  almoco: (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="24" cy="32" rx="14" ry="4" fill={G} opacity=".15" />
      <path d="M10 28a14 8 0 0 1 28 0" fill={C} stroke={G} strokeWidth="1.5" />
      <line x1="10" y1="28" x2="38" y2="28" stroke={G} strokeWidth="1.5" strokeLinecap="round" />
      <path d="M17 18c0-6 14-6 14 0" fill={G} opacity=".2" stroke={G} strokeWidth="1.2" />
      <line x1="24" y1="12" x2="24" y2="18" stroke={G} strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  ),
  bolo: (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="10" y="24" width="28" height="14" rx="3" fill={C} stroke={G} strokeWidth="1.5" />
      <path d="M10 30c4-4 8 4 14 0s10-4 14 0" stroke={G} strokeWidth="1.2" fill="none" />
      <line x1="24" y1="14" x2="24" y2="24" stroke={G} strokeWidth="1.5" strokeLinecap="round" />
      <path d="M21 14c0-2 6-2 6 0" stroke={G} strokeWidth="1.2" strokeLinecap="round" />
      <circle cx="24" cy="13" r="2" fill={G} opacity=".5" />
    </svg>
  ),
  airfryer: (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="10" y="12" width="28" height="28" rx="5" fill={C} stroke={G} strokeWidth="1.5" />
      <circle cx="24" cy="26" r="8" stroke={G} strokeWidth="1.3" fill={G} fillOpacity=".1" />
      <path d="M21 23l6 3-6 3V23Z" fill={G} opacity=".5" />
      <circle cx="32" cy="16" r="2" fill={G} opacity=".4" />
    </svg>
  ),
  cofrinho: (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M32 20c4 2 7 6 7 10a10 8 0 0 1-18 2l-2 4H14l1-5a10 8 0 0 1 1-14 10 8 0 0 1 16 3Z" fill={C} stroke={G} strokeWidth="1.5" strokeLinejoin="round" />
      <circle cx="35" cy="22" r="2" fill={G} opacity=".4" />
      <path d="M23 12v-3M20 9h8M22 26h4" stroke={G} strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  ),
  vaquinha: (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="24" cy="22" r="12" fill={C} stroke={G} strokeWidth="1.5" />
      <path d="M20 20c0-2 8-2 8 0" stroke={G} strokeWidth="1.2" strokeLinecap="round" />
      <path d="M24 22v4M20 26l4-4 4 4" stroke={G} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M18 36l2-4h8l2 4M15 20l-3-4M33 20l3-4" stroke={G} strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  ),
  sofa: (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="12" y="20" width="24" height="14" rx="3" fill={C} stroke={G} strokeWidth="1.5" />
      <rect x="8" y="22" width="7" height="10" rx="3" fill={G} opacity=".25" stroke={G} strokeWidth="1.2" />
      <rect x="33" y="22" width="7" height="10" rx="3" fill={G} opacity=".25" stroke={G} strokeWidth="1.2" />
      <rect x="14" y="16" width="20" height="6" rx="2" fill={G} opacity=".15" stroke={G} strokeWidth="1.2" />
      <line x1="14" y1="34" x2="12" y2="40" stroke={G} strokeWidth="1.5" strokeLinecap="round" />
      <line x1="34" y1="34" x2="36" y2="40" stroke={G} strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  ),
  tv: (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="6" y="10" width="36" height="24" rx="3" fill={C} stroke={G} strokeWidth="1.5" />
      <rect x="10" y="14" width="28" height="16" rx="1.5" fill={G} opacity=".12" />
      <line x1="18" y1="38" x2="30" y2="38" stroke={G} strokeWidth="1.5" strokeLinecap="round" />
      <line x1="24" y1="34" x2="24" y2="38" stroke={G} strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="36" cy="22" r="1.5" fill={G} opacity=".5" />
    </svg>
  ),
  spa: (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M24 36S10 28 10 18a8 8 0 0 1 14-5 8 8 0 0 1 14 5c0 10-14 18-14 18Z" fill={C} stroke={G} strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M24 13v23" stroke={G} strokeWidth="1.2" strokeLinecap="round" opacity=".4" />
    </svg>
  ),
  tesoura: (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="15" cy="33" r="5" stroke={G} strokeWidth="1.5" fill={C} />
      <circle cx="15" cy="15" r="5" stroke={G} strokeWidth="1.5" fill={C} />
      <line x1="19" y1="30" x2="38" y2="14" stroke={G} strokeWidth="1.5" strokeLinecap="round" />
      <line x1="19" y1="18" x2="38" y2="34" stroke={G} strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  ),
  danca: (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="28" cy="12" r="4" fill={G} opacity=".3" stroke={G} strokeWidth="1.5" />
      <path d="M28 16l-4 10 6 4M28 16l3 6-4 4" stroke={G} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M24 26l-4 8M31 22l5 6" stroke={G} strokeWidth="1.5" strokeLinecap="round" />
      <path d="M16 20c2-3 6-1 4 2" stroke={G} strokeWidth="1.3" strokeLinecap="round" />
    </svg>
  ),
  montanha: (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M6 38L18 16l8 12 4-6 12 16H6Z" fill={C} stroke={G} strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M18 16l3 4" stroke="white" strokeWidth="1.2" strokeLinecap="round" opacity=".6" />
      <circle cx="36" cy="14" r="4" fill={G} opacity=".25" stroke={G} strokeWidth="1.2" />
    </svg>
  ),
  mala: (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="8" y="18" width="32" height="22" rx="3" fill={C} stroke={G} strokeWidth="1.5" />
      <path d="M18 18v-4a4 4 0 0 1 12 0v4" stroke={G} strokeWidth="1.5" strokeLinecap="round" />
      <line x1="8" y1="28" x2="40" y2="28" stroke={G} strokeWidth="1.2" />
      <line x1="24" y1="18" x2="24" y2="40" stroke={G} strokeWidth="1.2" />
    </svg>
  ),
  massagem: (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M10 30c4-8 18-18 28-10" stroke={G} strokeWidth="1.5" strokeLinecap="round" fill="none" />
      <path d="M14 36c2-5 14-12 22-7" stroke={G} strokeWidth="1.2" strokeLinecap="round" fill="none" opacity=".5" />
      <path d="M24 12l-4 8h8l-4 8" stroke={G} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  bebe: (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="24" cy="16" r="8" fill={C} stroke={G} strokeWidth="1.5" />
      <path d="M18 20c1 4 10 4 12 0" stroke={G} strokeWidth="1.2" strokeLinecap="round" fill="none" />
      <circle cx="20" cy="15" r="1.2" fill={G} />
      <circle cx="28" cy="15" r="1.2" fill={G} />
      <path d="M14 28l-2 10h24l-2-10" fill={G} opacity=".15" stroke={G} strokeWidth="1.3" strokeLinejoin="round" />
      <path d="M20 28v10M28 28v10" stroke={G} strokeWidth="1" strokeLinecap="round" opacity=".4" />
    </svg>
  ),
  academia: (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="4" y="20" width="8" height="8" rx="2" fill={G} opacity=".3" stroke={G} strokeWidth="1.5" />
      <rect x="36" y="20" width="8" height="8" rx="2" fill={G} opacity=".3" stroke={G} strokeWidth="1.5" />
      <line x1="12" y1="24" x2="18" y2="24" stroke={G} strokeWidth="2.5" strokeLinecap="round" />
      <line x1="30" y1="24" x2="36" y2="24" stroke={G} strokeWidth="2.5" strokeLinecap="round" />
      <rect x="18" y="18" width="12" height="12" rx="2" fill={C} stroke={G} strokeWidth="1.5" />
    </svg>
  ),
  cinema: (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="8" y="16" width="24" height="20" rx="3" fill={C} stroke={G} strokeWidth="1.5" />
      <path d="M32 22l8-4v12l-8-4V22Z" fill={G} opacity=".25" stroke={G} strokeWidth="1.2" strokeLinejoin="round" />
      <path d="M13 22h8M13 28h6M13 32h10" stroke={G} strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  ),
  controle: (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="8" y="14" width="32" height="20" rx="6" fill={C} stroke={G} strokeWidth="1.5" />
      <line x1="18" y1="24" x2="26" y2="24" stroke={G} strokeWidth="1.5" strokeLinecap="round" />
      <line x1="22" y1="20" x2="22" y2="28" stroke={G} strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="32" cy="22" r="2" fill={G} opacity=".4" />
      <circle cx="32" cy="28" r="2" fill={G} opacity=".4" />
    </svg>
  ),
  sabre: (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <line x1="12" y1="38" x2="38" y2="12" stroke={G} strokeWidth="2.5" strokeLinecap="round" />
      <rect x="9" y="34" width="7" height="7" rx="2" fill={G} opacity=".35" stroke={G} strokeWidth="1.2" transform="rotate(-45 12 38)" />
      <line x1="28" y1="22" x2="38" y2="12" stroke={G} strokeWidth="1.2" strokeLinecap="round" opacity=".4" />
    </svg>
  ),
  fusca: (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M6 28h36v6H6z" fill={C} stroke={G} strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M10 28c2-8 26-8 28 0" fill={G} opacity=".15" stroke={G} strokeWidth="1.5" />
      <circle cx="14" cy="34" r="4" fill={C} stroke={G} strokeWidth="1.5" />
      <circle cx="34" cy="34" r="4" fill={C} stroke={G} strokeWidth="1.5" />
      <circle cx="14" cy="34" r="1.5" fill={G} opacity=".4" />
      <circle cx="34" cy="34" r="1.5" fill={G} opacity=".4" />
      <path d="M18 22l2-4h8l2 4" stroke={G} strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  ),
  casa: (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M6 22L24 8l18 14" stroke={G} strokeWidth="1.5" strokeLinejoin="round" strokeLinecap="round" />
      <rect x="10" y="22" width="28" height="18" rx="1" fill={C} stroke={G} strokeWidth="1.5" />
      <rect x="20" y="28" width="8" height="12" rx="1" fill={G} opacity=".2" />
      <rect x="12" y="26" width="6" height="6" rx="1" fill={G} opacity=".2" />
      <rect x="30" y="26" width="6" height="6" rx="1" fill={G} opacity=".2" />
    </svg>
  ),
  carro: (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="4" y="26" width="40" height="10" rx="3" fill={C} stroke={G} strokeWidth="1.5" />
      <path d="M8 26l4-8h24l4 8" fill={G} opacity=".15" stroke={G} strokeWidth="1.5" strokeLinejoin="round" />
      <circle cx="13" cy="36" r="4" fill={C} stroke={G} strokeWidth="1.5" />
      <circle cx="35" cy="36" r="4" fill={C} stroke={G} strokeWidth="1.5" />
      <circle cx="13" cy="36" r="1.5" fill={G} opacity=".4" />
      <circle cx="35" cy="36" r="1.5" fill={G} opacity=".4" />
    </svg>
  ),
  lavanderia: (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="8" y="8" width="32" height="36" rx="3" fill={C} stroke={G} strokeWidth="1.5" />
      <circle cx="24" cy="28" r="10" stroke={G} strokeWidth="1.5" fill={G} fillOpacity=".1" />
      <circle cx="24" cy="28" r="5" stroke={G} strokeWidth="1.2" fill={G} fillOpacity=".1" />
      <circle cx="14" cy="14" r="2" fill={G} opacity=".3" />
      <circle cx="20" cy="14" r="2" fill={G} opacity=".3" />
    </svg>
  ),
  geladeira: (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="10" y="6" width="28" height="38" rx="3" fill={C} stroke={G} strokeWidth="1.5" />
      <line x1="10" y1="22" x2="38" y2="22" stroke={G} strokeWidth="1.5" />
      <line x1="26" y1="10" x2="26" y2="18" stroke={G} strokeWidth="1.5" strokeLinecap="round" />
      <line x1="26" y1="26" x2="26" y2="38" stroke={G} strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  ),
  cama: (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="4" y="26" width="40" height="12" rx="3" fill={C} stroke={G} strokeWidth="1.5" />
      <path d="M4 26V16a2 2 0 0 1 2-2h36a2 2 0 0 1 2 2v10" stroke={G} strokeWidth="1.5" strokeLinecap="round" />
      <rect x="8" y="16" width="12" height="10" rx="2" fill={G} opacity=".15" />
      <rect x="28" y="16" width="12" height="10" rx="2" fill={G} opacity=".15" />
      <line x1="4" y1="38" x2="4" y2="42" stroke={G} strokeWidth="1.5" strokeLinecap="round" />
      <line x1="44" y1="38" x2="44" y2="42" stroke={G} strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  ),
  chave: (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="16" cy="20" r="10" fill={C} stroke={G} strokeWidth="1.5" />
      <circle cx="16" cy="20" r="4" fill={G} opacity=".25" />
      <path d="M24 24l14 14M34 34l4-4M30 38l4-4" stroke={G} strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  ),
  gamepad: (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M8 20h32l-4 16H12L8 20Z" fill={C} stroke={G} strokeWidth="1.5" strokeLinejoin="round" />
      <line x1="18" y1="27" x2="26" y2="27" stroke={G} strokeWidth="1.5" strokeLinecap="round" />
      <line x1="22" y1="23" x2="22" y2="31" stroke={G} strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="32" cy="25" r="1.8" fill={G} opacity=".4" />
      <circle cx="32" cy="30" r="1.8" fill={G} opacity=".4" />
      <path d="M6 20c2-4 34-4 36 0" stroke={G} strokeWidth="1.2" strokeLinecap="round" opacity=".4" />
    </svg>
  ),
  upgrade: (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <polyline points="6,36 16,24 24,30 38,12" stroke={G} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      <polyline points="30,12 38,12 38,20" stroke={G} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      <line x1="6" y1="42" x2="42" y2="42" stroke={G} strokeWidth="1.5" strokeLinecap="round" opacity=".4" />
    </svg>
  ),
}

// ─── Helpers ────────────────────────────────────────────────────────────────
function formatBRL(v: number) {
  return v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
}

// ─── Data ───────────────────────────────────────────────────────────────────
type Presente = { icon: string; nome: string; nota: string; valor: number }
type Categoria = { nome: string; itens: Presente[] }

const categorias: Categoria[] = [
  {
    nome: 'Cozinha & Sabores',
    itens: [
      { icon: 'sal',       nome: 'Sal Grosso',                 nota: 'Ingrediente sagrado da carne',      valor: 50  },
      { icon: 'cafe',      nome: 'Café pra Noiva',             nota: 'Combustível essencial do dia',      valor: 80  },
      { icon: 'avental',   nome: 'Avental do Chef',            nota: 'Para profetizar uma boa culinária', valor: 120 },
      { icon: 'tabua',     nome: 'Tábua de Carne',             nota: 'Pro noivo mostrar seus dotes',      valor: 150 },
      { icon: 'chocolate', nome: 'Estoque de Chocolate',       nota: 'Alívio emergencial da TPM',         valor: 200 },
      { icon: 'bolo',      nome: 'Bolo de Chocolate Semanal',  nota: 'Exclusivo para a noiva',            valor: 400 },
      { icon: 'airfryer',  nome: 'Airfryer',                   nota: 'Para o famoso flanguinho',          valor: 500 },
      { icon: 'almoco',    nome: 'Um Mês de Almoço',           nota: 'Garantido em casa, todo dia',       valor: 800 },
    ],
  },
  {
    nome: 'Fundo Especial',
    itens: [
      { icon: 'vaquinha', nome: 'Vaquinha do Casamento',    nota: 'Cada centavo é amor',           valor: 200  },
      { icon: 'cofrinho', nome: 'Cofrinho da TPM',          nota: 'Fundo emergencial garantido',   valor: 300  },
      { icon: 'tv',       nome: 'TV para The Chosen',       nota: 'Assistir juntos é sagrado',     valor: 1800 },
      { icon: 'sofa',     nome: 'Sofá da Célula',           nota: 'Para a galera sentar em paz',   valor: 2500 },
    ],
  },
  {
    nome: 'Experiências',
    itens: [
      { icon: 'danca',    nome: 'Vale Dancinha Esquisita',   nota: 'Na festa, sem julgamentos',         valor: 50   },
      { icon: 'tesoura',  nome: 'Vale Corte de Cabelo',      nota: 'Pro noivo ficar apresentável',      valor: 80   },
      { icon: 'bebe',     nome: 'Máscara de Gás',            nota: 'Para o futuro filho do casal',      valor: 150  },
      { icon: 'massagem', nome: 'Massagem para o Noivo',     nota: 'Após ver a conta do casamento',     valor: 250  },
      { icon: 'mala',     nome: 'Cota para a Viagem',        nota: 'Cada pouquinho conta muito',        valor: 500  },
      { icon: 'spa',      nome: 'Vale SPA',                  nota: 'Para os noivos relaxarem',          valor: 600  },
      { icon: 'academia', nome: 'Academia do Casal',         nota: 'Recuperação pós-festa',             valor: 1200 },
      { icon: 'montanha', nome: 'Lua de Mel em Bariloche',   nota: 'O sonho deles',                     valor: 8000 },
    ],
  },
  {
    nome: 'Lar Doce Lar',
    itens: [
      { icon: 'controle',   nome: 'Kit Controles Remotos',    nota: 'Sem briga por canal',               valor: 300  },
      { icon: 'sabre',      nome: 'Sabres de Luz',            nota: 'Para resolver os conflitos',        valor: 350  },
      { icon: 'cinema',     nome: 'Kit Cinema em Casa',       nota: 'Pipoca, manta e amor',              valor: 400  },
      { icon: 'lavanderia', nome: 'Máquina de Lavar',         nota: 'Vida prática garantida',            valor: 1500 },
      { icon: 'upgrade',    nome: 'Upgrade na Carreira',      nota: 'O maior investimento',              valor: 1500 },
      { icon: 'geladeira',  nome: 'Geladeira',                nota: 'Para o chocolate não derreter',     valor: 2200 },
      { icon: 'cama',       nome: 'Cama King',                nota: 'Conforto máximo',                   valor: 3500 },
      { icon: 'gamepad',    nome: 'PS5',                      nota: 'Quando a noiva estiver no retiro',  valor: 4500 },
      { icon: 'fusca',      nome: 'Um Fusca',                 nota: 'Pro noivo levar a noiva passear',   valor: 5000 },
      { icon: 'carro',      nome: 'Um Carro',                 nota: 'Para o dia a dia',                  valor: 8000 },
      { icon: 'chave',      nome: '1 Ano de Aluguel',         nota: 'O presente dos presentes',          valor: 9000 },
      { icon: 'casa',       nome: 'Uma Casa',                 nota: 'O lar deles',                       valor: 10000},
    ],
  },
]

// ─── PIX Bottom Sheet ────────────────────────────────────────────────────────
function PixSheet({ presente, onClose, onConfirmar }: {
  presente: Presente
  onClose: () => void
  onConfirmar: () => void
}) {
  const [copied, setCopied] = useState(false)
  const [confirmado, setConfirmado] = useState(false)
  const [confirmando, setConfirmando] = useState(false)

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(PIX_KEY)
    } catch {
      const el = document.createElement('textarea')
      el.value = PIX_KEY
      document.body.appendChild(el)
      el.select()
      document.execCommand('copy')
      document.body.removeChild(el)
    }
    setCopied(true)
    setTimeout(() => setCopied(false), 2500)
  }, [])

  async function handleConfirmar() {
    setConfirmando(true)
    await supabase.from('rf_presentes').insert({ presente_nome: presente.nome })
    setConfirmando(false)
    setConfirmado(true)
    onConfirmar()
    setTimeout(() => onClose(), 1800)
  }

  return (
    <>
      {/* overlay */}
      <div
        className="fixed inset-0 z-40"
        style={{ backgroundColor: 'rgba(18,10,2,0.55)', backdropFilter: 'blur(2px)' }}
        onClick={onClose}
      />

      {/* sheet */}
      <div
        className="fixed bottom-0 left-0 right-0 z-50 px-5 pb-10 pt-6 max-w-lg mx-auto"
        style={{
          backgroundColor: '#FAF7F2',
          borderTop: '2px solid #B87040',
          borderRadius: '16px 16px 0 0',
          boxShadow: '0 -8px 40px rgba(18,10,2,0.25)',
        }}
      >
        {/* drag handle */}
        <div className="flex justify-center mb-5">
          <div style={{ width: 36, height: 4, borderRadius: 2, backgroundColor: '#D0C2B0' }} />
        </div>

        {/* presente escolhido */}
        <p className="font-sans font-bold uppercase mb-1" style={{ fontSize: '0.6rem', letterSpacing: '0.3em', color: '#B87040' }}>
          Você escolheu
        </p>
        <p className="font-serif italic font-light mb-1" style={{ fontSize: '1.35rem', color: '#1E1208' }}>
          {presente.nome}
        </p>
        <p className="font-sans font-bold mb-5" style={{ fontSize: '1rem', color: '#B87040' }}>
          {formatBRL(presente.valor)}
        </p>

        <div style={{ height: '1px', backgroundColor: '#D0C2B0', marginBottom: '1.25rem' }} />

        {/* pix label */}
        <p className="font-sans font-bold uppercase mb-3" style={{ fontSize: '0.6rem', letterSpacing: '0.3em', color: '#6B4F3A' }}>
          Chave PIX — Flávia F. Souza
        </p>

        {/* pix key + copy button */}
        <div
          className="flex items-stretch mb-4 overflow-hidden"
          style={{ border: '1px solid #D0C2B0' }}
        >
          <div
            className="flex-1 flex items-center px-4"
            style={{ backgroundColor: '#F0E8DA', fontSize: '1.05rem', fontFamily: 'monospace', color: '#1E1208', letterSpacing: '0.05em' }}
          >
            {PIX_KEY}
          </div>
          <button
            onClick={handleCopy}
            className="flex items-center justify-center px-5 font-sans font-bold uppercase transition-colors"
            style={{
              fontSize: '0.6rem',
              letterSpacing: '0.2em',
              minHeight: 52,
              backgroundColor: copied ? '#2E7D32' : '#B87040',
              color: '#FAF7F2',
              border: 'none',
              cursor: 'pointer',
              minWidth: 88,
              transition: 'background-color 0.2s',
            }}
          >
            {copied ? '✓ Copiado' : 'Copiar'}
          </button>
        </div>

        <p className="body-text-sm text-center mb-6" style={{ color: '#8B6B50' }}>
          Após o PIX, nos avise pelo WhatsApp para não esquecer quem presenteou! 🤍
        </p>

        {/* confirmar presente */}
        {confirmado ? (
          <div className="w-full py-3.5 text-center font-sans font-bold uppercase"
            style={{ fontSize: '0.6rem', letterSpacing: '0.3em', backgroundColor: '#2E7D32', color: '#FAF7F2' }}>
            ✓ Presente confirmado!
          </div>
        ) : (
          <>
            <button
              onClick={handleConfirmar}
              disabled={confirmando}
              className="w-full font-sans font-bold uppercase py-3.5 mb-3 transition-opacity hover:opacity-80 disabled:opacity-50"
              style={{
                fontSize: '0.6rem',
                letterSpacing: '0.3em',
                color: '#FAF7F2',
                backgroundColor: '#B87040',
                border: 'none',
                cursor: 'pointer',
              }}
            >
              {confirmando ? 'Registrando...' : 'Já fiz o PIX ✓'}
            </button>
            <button
              onClick={onClose}
              className="w-full font-sans font-bold uppercase py-3 transition-opacity hover:opacity-60"
              style={{
                fontSize: '0.6rem',
                letterSpacing: '0.3em',
                color: '#9A7E6A',
                backgroundColor: 'transparent',
                border: 'none',
                cursor: 'pointer',
              }}
            >
              Fechar
            </button>
          </>
        )}
      </div>
    </>
  )
}

// ─── Card ────────────────────────────────────────────────────────────────────
function PresenteCard({ item, cotas, onSelect }: {
  item: Presente
  cotas: number
  onSelect: (p: Presente) => void
}) {
  const esgotado = cotas >= MAX_COTAS

  return (
    <div
      className="flex flex-col overflow-hidden"
      style={{
        border: '1px solid #D0C2B0',
        backgroundColor: '#FAF7F2',
        opacity: esgotado ? 0.75 : 1,
      }}
    >
      {/* icon */}
      <div
        className="flex items-center justify-center h-[100px] md:h-[128px] relative"
        style={{
          background: 'linear-gradient(155deg, #F5ECE1 0%, #EAD9C6 100%)',
          boxShadow: 'inset 0 -1px 0 rgba(184,112,64,0.12)',
        }}
      >
        <div className="w-[64px] h-[64px] md:w-[80px] md:h-[80px]" style={{ filter: 'drop-shadow(0 3px 6px rgba(139,82,48,0.22))' }}>
          {icons[item.icon]}
        </div>
        {esgotado && (
          <div className="absolute inset-0 flex items-center justify-center"
            style={{ backgroundColor: 'rgba(18,10,2,0.45)' }}>
            <span className="font-sans font-bold uppercase text-white"
              style={{ fontSize: '0.6rem', letterSpacing: '0.25em' }}>Esgotado</span>
          </div>
        )}
      </div>

      {/* text */}
      <div className="flex flex-col flex-1 p-3 gap-1">
        <p className="font-serif italic font-light leading-tight" style={{ fontSize: '0.875rem', color: '#1E1208' }}>
          {item.nome}
        </p>
        <p className="font-sans font-light leading-tight" style={{ fontSize: '0.67rem', color: '#8B6B50' }}>
          {item.nota}
        </p>
        <div className="flex items-center justify-between mt-1">
          <p className="font-sans font-bold" style={{ fontSize: '0.8rem', color: '#B87040' }}>
            {formatBRL(item.valor)}
          </p>
          <p className="font-sans font-light" style={{ fontSize: '0.6rem', color: cotas > 0 ? '#B87040' : '#C0B0A0' }}>
            {cotas}/{MAX_COTAS}
          </p>
        </div>

        {/* cta */}
        <button
          onClick={() => !esgotado && onSelect(item)}
          disabled={esgotado}
          className="mt-auto pt-2.5 w-full font-sans font-bold uppercase text-center transition-opacity active:opacity-70 disabled:cursor-not-allowed disabled:opacity-40"
          style={{
            fontSize: '0.55rem',
            letterSpacing: '0.2em',
            color: '#FAF7F2',
            backgroundColor: esgotado ? '#9A7E6A' : '#B87040',
            padding: '7px 0',
            border: 'none',
            cursor: esgotado ? 'not-allowed' : 'pointer',
          }}
        >
          {esgotado ? 'Esgotado' : 'Presentear'}
        </button>
      </div>
    </div>
  )
}

// ─── Page ────────────────────────────────────────────────────────────────────
export default function ListaPresentes() {
  const [selecionado, setSelecionado] = useState<Presente | null>(null)
  const [cotas, setCotas] = useState<Record<string, number>>({})

  useEffect(() => {
    async function fetchCotas() {
      const { data } = await supabase.from('rf_presentes').select('presente_nome')
      if (!data) return
      const counts: Record<string, number> = {}
      data.forEach(({ presente_nome }) => {
        counts[presente_nome] = (counts[presente_nome] || 0) + 1
      })
      setCotas(counts)
    }
    fetchCotas()
  }, [])

  function handleConfirmar() {
    if (!selecionado) return
    setCotas(prev => ({ ...prev, [selecionado.nome]: (prev[selecionado.nome] || 0) + 1 }))
  }

  return (
    <div className="min-h-screen">
      <PageHeader
        title="Lista de presentes"
        subtitle="A melhor forma de nos presentear é com sua presença. Mas se quiser nos ajudar a construir nosso lar, ficamos muito gratos!"
      />

      <section className="px-6 md:px-10 pt-12 pb-4 max-w-6xl mx-auto">
        {categorias.map((cat, i) => (
          <div key={cat.nome} className={i < categorias.length - 1 ? 'mb-14' : 'mb-6'}>
            <p className="section-label pb-3 mb-5" style={{ borderBottom: '2px solid #B87040' }}>
              {cat.nome}
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
              {cat.itens.map((item) => (
                <PresenteCard key={item.nome} item={item} cotas={cotas[item.nome] || 0} onSelect={setSelecionado} />
              ))}
            </div>
          </div>
        ))}
      </section>

      {/* PIX section */}
      <section
        className="px-6 md:px-10 max-w-6xl mx-auto text-center"
        style={{ borderTop: '1px solid #D0C2B0', paddingTop: '3rem', paddingBottom: '4rem' }}
      >
        <p className="section-label mb-8">Ou contribua via PIX direto</p>
        <div className="p-6 md:max-w-md mx-auto" style={{ backgroundColor: '#EDE4D8', border: '1px solid #D0C2B0' }}>
          <p className="eyebrow block mb-3" style={{ color: '#6B4F3A' }}>Chave PIX — Flávia F. Souza</p>
          <div
            className="flex items-stretch overflow-hidden"
            style={{ border: '1px solid #D0C2B0', marginTop: '0.5rem' }}
          >
            <div
              className="flex-1 flex items-center px-4 py-3"
              style={{ backgroundColor: '#F0E8DA', fontFamily: 'monospace', fontSize: '1.05rem', color: '#1E1208', letterSpacing: '0.05em' }}
            >
              {PIX_KEY}
            </div>
            <PixCopyButton />
          </div>
        </div>
        <p className="body-text-sm text-center mt-5">
          Todo presente, grande ou pequeno, é recebido com muito amor.
        </p>
      </section>

      {/* Versículo */}
      <div className="px-6 md:px-10 max-w-6xl mx-auto">
        <div className="verse-block">
          <p className="verse-text">&ldquo;Que cada dom perfeito vem do alto.&rdquo;</p>
          <span className="verse-ref">Tiago 1:17</span>
        </div>
      </div>

      {/* PIX sheet */}
      {selecionado && (
        <PixSheet presente={selecionado} onClose={() => setSelecionado(null)} onConfirmar={handleConfirmar} />
      )}
    </div>
  )
}

// botão de cópia isolado para a seção de PIX direto
function PixCopyButton() {
  const [copied, setCopied] = useState(false)

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(PIX_KEY)
    } catch {
      const el = document.createElement('textarea')
      el.value = PIX_KEY
      document.body.appendChild(el)
      el.select()
      document.execCommand('copy')
      document.body.removeChild(el)
    }
    setCopied(true)
    setTimeout(() => setCopied(false), 2500)
  }, [])

  return (
    <button
      onClick={handleCopy}
      className="flex items-center justify-center px-4 font-sans font-bold uppercase transition-colors"
      style={{
        fontSize: '0.6rem',
        letterSpacing: '0.18em',
        backgroundColor: copied ? '#2E7D32' : '#B87040',
        color: '#FAF7F2',
        border: 'none',
        cursor: 'pointer',
        minWidth: 80,
        transition: 'background-color 0.2s',
      }}
    >
      {copied ? '✓ Copiado' : 'Copiar'}
    </button>
  )
}
