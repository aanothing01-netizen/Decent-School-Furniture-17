export interface ThemeFile {
  path: string;
  category: 'layout' | 'templates' | 'sections' | 'snippets' | 'config' | 'locales' | 'assets' | 'docs';
  content: string;
}

export const SHOPIFY_THEME_FILES: ThemeFile[] = [
  {
    path: 'layout/theme.liquid',
    category: 'layout',
    content: `<!doctype html>
<html class="no-js" lang="{{ request.locale.iso_code }}">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width,initial-scale=1">
    <meta name="theme-color" content="{{ settings.color_primary | default: '#102A43' }}">
    <link rel="canonical" href="{{ canonical_url }}">
    {%- if settings.favicon != blank -%}
      <link rel="icon" type="image/png" href="{{ settings.favicon | image_url: width: 32, height: 32 }}">
    {%- endif -%}
    {% render 'seo-meta' %}
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@500;600;700;800&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet">
    {{ 'base.css' | asset_url | stylesheet_tag }}
    {{ content_for_header }}
  </head>
  <body class="template-{{ template.name | handle }} bg-light text-main antialiased">
    {% section 'announcement-bar' %}
    {% section 'header' %}
    <main id="MainContent" class="content-for-layout focus-none" role="main" tabindex="-1">
      {{ content_for_layout }}
    </main>
    {% section 'footer' %}
    {% render 'whatsapp-link' %}
  </body>
</html>`,
  },
  {
    path: 'config/settings_schema.json',
    category: 'config',
    content: `[
  {
    "name": "Theme Colors",
    "settings": [
      { "type": "color", "id": "color_primary", "label": "Primary Navy Blue", "default": "#102A43" },
      { "type": "color", "id": "color_secondary", "label": "Secondary Steel Blue", "default": "#486581" },
      { "type": "color", "id": "color_accent", "label": "Accent Orange", "default": "#F59E0B" }
    ]
  },
  {
    "name": "Institutional Contact",
    "settings": [
      { "type": "text", "id": "phone_number", "label": "Phone Number", "default": "+92 300 1234567" },
      { "type": "text", "id": "whatsapp_number", "label": "WhatsApp (International)", "default": "923001234567" }
    ]
  }
]`,
  },
  {
    path: 'snippets/product-card.liquid',
    category: 'snippets',
    content: `<div class="product-card">
  <a href="{{ product.url }}">{{ product.title }}</a>
  <span>{{ product.price | money }}</span>
</div>`,
  },
];
