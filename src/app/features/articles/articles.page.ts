import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { MIGUEL_BADONE } from '../../core/disciplines.data';
import { SiteFooterComponent } from '../../shared/site-footer.component';
import { SiteHeaderComponent } from '../../shared/site-header.component';

interface ArticleItem {
  readonly name: string;
  readonly category: string;
  readonly description: string;
  readonly position: string;
  readonly sizes?: readonly string[];
  readonly variants: readonly ArticleVariant[];
}

interface ArticleVariant {
  readonly name: string;
  readonly sheetClass: string;
}

@Component({
  selector: 'app-articles-page',
  standalone: true,
  imports: [SiteHeaderComponent, SiteFooterComponent],
  template: `
    <app-site-header />
    <main class="articles-page">
      <section class="articles-hero" aria-labelledby="articles-title">
        <div class="page-container articles-hero-inner">
          <p class="eyebrow"><span></span> EQUIPAMIENTO DE COMBATE</p>
          <h1 id="articles-title">ARTÍCULOS <em>DE ENTRENAMIENTO.</em></h1>
          <p>Protección, indumentaria y accesorios para entrenar. Consultá disponibilidad, talles y precio directamente con Miguel.</p>
        </div>
      </section>
      <section class="articles-catalog" aria-labelledby="catalog-title">
        <div class="page-container">
          <div class="catalog-heading"><div><p class="eyebrow"><span></span> CATÁLOGO ILUSTRATIVO</p><h2 id="catalog-title">ELEGÍ TU <em>EQUIPAMIENTO.</em></h2></div><span class="catalog-note">IMÁGENES DE REFERENCIA · STOCK A CONFIRMAR</span></div>
          <div class="product-grid">
            @for (article of articles; track article.name) {
              <article class="product-card">
                @let variantIndex = selectedVariants()[article.name] || 0;
                @let variant = article.variants[variantIndex];
                <div class="product-image" [class]="article.position + ' ' + variant.sheetClass" role="img" [attr.aria-label]="article.name + ' ' + variant.name + ', imagen ilustrativa'"><span>IMAGEN ILUSTRATIVA</span>
                  @if (article.variants.length > 1) {
                    <button class="carousel-control carousel-prev" type="button" (click)="previousVariant(article.name, article.variants.length)" aria-label="Modelo anterior">‹</button>
                    <button class="carousel-control carousel-next" type="button" (click)="nextVariant(article.name, article.variants.length)" aria-label="Modelo siguiente">›</button>
                  }
                </div>
                <div class="product-card-body">
                  <span class="product-category">{{ article.category }}</span>
                  <h3>{{ article.name }}</h3><span class="product-variant">{{ variant.name }}</span>
                  <p>{{ article.description }}</p>
                  @if (article.sizes) {
                    <label class="size-picker">Talle
                      <select [value]="selectedSizes()[article.name] || ''" (change)="setSize(article.name, $event)">
                        <option value="">Elegir talle</option>
                        @for (size of article.sizes; track size) { <option [value]="size">{{ size }}</option> }
                      </select>
                    </label>
                  } @else {
                    <span class="one-size">Sin talle · consultar disponibilidad</span>
                  }
                  <div class="product-card-footer"><span class="product-price">Precio a confirmar</span><a class="product-button" [class.product-button-muted]="article.sizes && !selectedSizes()[article.name]" [attr.href]="article.sizes && !selectedSizes()[article.name] ? null : whatsappUrl(article.name, variant.name, selectedSizes()[article.name])" [attr.aria-disabled]="article.sizes && !selectedSizes()[article.name]" target="_blank" rel="noopener noreferrer">{{ article.sizes && !selectedSizes()[article.name] ? 'ELEGIR TALLE' : 'CONSULTAR' }} <span aria-hidden="true">↗</span></a></div>
                </div>
              </article>
            }
          </div>
          <div class="articles-contact"><div><span class="eyebrow"><span></span> ¿NO ENCONTRÁS LO QUE BUSCÁS?</span><h2>CONSULTÁ <em>DISPONIBILIDAD.</em></h2></div><a class="button button-primary" [href]="generalContactUrl" target="_blank" rel="noopener noreferrer">HABLAR POR WHATSAPP <span aria-hidden="true">↗</span></a></div>
        </div>
      </section>
    </main>
    <app-site-footer />
  `,
  styles: [`
    :host{display:block;--articles-bg:#090b0f;--articles-border:#343a44;color:#f7f8fa;font-family:Inter,Arial,system-ui,sans-serif}.articles-page{background:var(--articles-bg)}.page-container{width:min(1320px,calc(100% - 64px));margin-inline:auto}.eyebrow{display:flex;align-items:center;gap:10px;margin:0 0 18px;color:#d4d8de;font-size:10px;font-weight:800;letter-spacing:2px;text-transform:uppercase}.eyebrow>span{width:25px;height:2px;background:#e51c2d;transform:skewX(-25deg)}h1,h2,h3,p{margin-top:0}.articles-hero{padding:92px 0 78px;background:radial-gradient(circle at 78% 20%,#53151d66,transparent 42%),linear-gradient(130deg,#090b0f,#171a20);border-bottom:1px solid var(--articles-border)}.articles-hero h1,.catalog-heading h2,.articles-contact h2{font-family:'Roboto Condensed','Arial Narrow',Impact,system-ui,sans-serif;font-style:italic;font-weight:1000;letter-spacing:-.055em;line-height:.9}.articles-hero h1{max-width:850px;margin:0;font-size:clamp(58px,8vw,112px)}.articles-hero h1 em,.catalog-heading h2 em,.articles-contact h2 em{color:#e51c2d;font-style:inherit}.articles-hero p:not(.eyebrow){max-width:580px;margin:25px 0 0;color:#bfc3c9;font-size:15px;line-height:1.75}.articles-catalog{padding:72px 0 88px}.catalog-heading{display:flex;align-items:end;justify-content:space-between;gap:25px;margin-bottom:28px}.catalog-heading h2{margin:0;font-size:clamp(40px,5vw,66px)}.catalog-note{color:#858c96;font-size:9px;font-weight:800;letter-spacing:1.25px}.product-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:16px}.product-card{min-width:0;overflow:hidden;background:#f4f4f2;color:#16181d;border:1px solid #e2e2dd;box-shadow:0 14px 34px #0003}.product-image{position:relative;aspect-ratio:1/1;background-image:url('/assets/articulos-catalogo.png');background-size:200% 300%;background-repeat:no-repeat;background-color:#16181d}.catalog-sheet-alt{background-image:url('/assets/articulos-catalogo-alt.png')}.product-image:after{content:"";position:absolute;inset:0;background:linear-gradient(180deg,transparent 67%,#0005)}.product-image span{position:absolute;z-index:1;right:10px;bottom:9px;padding:4px 6px;background:#090b0fcc;color:#fff;font-size:7px;font-weight:800;letter-spacing:.8px}.product-tibiales{background-position:0 0}.product-guantes{background-position:100% 0}.product-vendas{background-position:0 50%}.product-bucales{background-position:100% 50%}.product-shorts{background-position:0 100%}.product-remeras{background-position:100% 100%}.carousel-control{position:absolute;z-index:2;top:50%;display:grid;place-items:center;width:30px;height:30px;border:1px solid #fff;background:#090b0dcc;color:#fff;font-size:25px;line-height:1;transform:translateY(-50%);cursor:pointer}.carousel-control:hover{background:#e51c2d}.carousel-prev{left:10px}.carousel-next{right:10px}.product-card-body{padding:18px 17px 16px}.product-category{color:#e51c2d;font-size:8px;font-weight:900;letter-spacing:1.2px;text-transform:uppercase}.product-card h3{margin:8px 0 2px;font-family:'Roboto Condensed','Arial Narrow',Impact,system-ui,sans-serif;font-size:25px;font-style:italic;text-transform:uppercase}.product-variant{display:block;color:#59616b;font-size:10px;font-weight:800;letter-spacing:.5px}.product-card p{min-height:39px;margin:8px 0 0;color:#696e76;font-size:11px;line-height:1.5}.size-picker{display:grid;gap:5px;margin-top:13px;color:#555b64;font-size:9px;font-weight:900;letter-spacing:.8px;text-transform:uppercase}.size-picker select{width:100%;min-height:34px;padding:0 9px;border:1px solid #c9cbd0;background:#fff;color:#16181d;font:700 11px Inter,Arial,sans-serif}.size-picker select:focus-visible{outline:2px solid #e51c2d;outline-offset:2px}.one-size{display:block;min-height:34px;margin-top:13px;padding-top:10px;color:#696e76;font-size:9px;font-weight:800}.product-card-footer{display:flex;align-items:center;justify-content:space-between;gap:10px;margin-top:17px}.product-price{font-size:11px;font-weight:800}.product-button{display:inline-flex;align-items:center;gap:8px;padding:10px 11px;background:#168c4a;color:#fff;text-decoration:none;font-size:9px;font-weight:900;letter-spacing:.6px}.product-button:hover{background:#20a95e}.product-button-muted{background:#4e555c}.product-button-muted:hover{background:#636a72}.articles-contact{display:flex;align-items:center;justify-content:space-between;gap:25px;margin-top:18px;padding:29px 30px;background:linear-gradient(110deg,#a80f1d,#e51c2d)}.articles-contact .eyebrow{margin-bottom:12px;color:#ffe4e6}.articles-contact .eyebrow>span{background:#fff}.articles-contact h2{margin:0;font-size:clamp(32px,4vw,54px)}.button{min-height:48px;padding:0 18px;display:inline-flex;align-items:center;justify-content:space-between;gap:25px;color:#fff;text-decoration:none;font-family:'Roboto Condensed','Arial Narrow',Impact,system-ui,sans-serif;font-size:14px;font-weight:900;letter-spacing:.55px}.button-primary{background:#fff;color:#121419}.button-primary:hover{background:#f2f2f2}.articles-contact .button{flex:none}@media(max-width:900px){.catalog-heading{align-items:flex-start;flex-direction:column;gap:10px}.product-grid{grid-template-columns:repeat(2,minmax(0,1fr))}.articles-contact{align-items:flex-start;flex-direction:column}}@media(max-width:560px){.page-container{width:calc(100% - 32px)}.articles-hero{padding:67px 0 59px}.articles-hero h1{font-size:clamp(48px,13vw,72px)}.articles-catalog{padding:57px 0 68px}.product-grid{grid-template-columns:1fr;gap:12px}.product-card{display:grid;grid-template-columns:42% 58%}.product-image{aspect-ratio:auto;min-height:185px}.product-card-body{padding:15px 13px}.product-card h3{font-size:20px}.product-card p{min-height:0;font-size:10px}.product-card-footer{align-items:flex-start;flex-direction:column;gap:10px;margin-top:13px}.articles-contact{padding:23px 18px}.articles-contact .button{width:100%;font-size:11px}}
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ArticlesPage {
  readonly selectedSizes = signal<Record<string, string>>({});
  readonly selectedVariants = signal<Record<string, number>>({});
  readonly articles: readonly ArticleItem[] = [
    { name: 'Tibiales', category: 'Protección', description: 'Protección para piernas y empeines durante el entrenamiento.', position: 'product-tibiales', sizes: ['S', 'M', 'L', 'XL'], variants: [{ name: 'Modelo 1', sheetClass: 'catalog-sheet-base' }, { name: 'Modelo 2', sheetClass: 'catalog-sheet-alt' }] },
    { name: 'Guantes', category: 'Protección', description: 'Guantes para práctica de striking y trabajo técnico.', position: 'product-guantes', sizes: ['S', 'M', 'L', 'XL'], variants: [{ name: 'Modelo 1', sheetClass: 'catalog-sheet-base' }, { name: 'Modelo 2', sheetClass: 'catalog-sheet-alt' }] },
    { name: 'Vendas', category: 'Entrenamiento', description: 'Vendas para acompañar el uso de guantes y proteger las manos.', position: 'product-vendas', variants: [{ name: 'Modelo disponible', sheetClass: 'catalog-sheet-base' }] },
    { name: 'Bucales', category: 'Protección', description: 'Bucales para sumar protección a tu entrenamiento.', position: 'product-bucales', variants: [{ name: 'Modelo disponible', sheetClass: 'catalog-sheet-base' }] },
    { name: 'Shorts', category: 'Indumentaria', description: 'Shorts cómodos para entrenar con libertad de movimiento.', position: 'product-shorts', sizes: ['S', 'M', 'L', 'XL'], variants: [{ name: 'Modelo 1', sheetClass: 'catalog-sheet-base' }, { name: 'Modelo 2', sheetClass: 'catalog-sheet-alt' }] },
    { name: 'Remeras', category: 'Indumentaria', description: 'Remeras deportivas para entrenar o usar todos los días.', position: 'product-remeras', sizes: ['S', 'M', 'L', 'XL', 'XXL'], variants: [{ name: 'Modelo 1', sheetClass: 'catalog-sheet-base' }, { name: 'Modelo 2', sheetClass: 'catalog-sheet-alt' }] },
  ];
  readonly generalContactUrl = this.whatsappUrl('equipamiento de combate', 'modelos disponibles');

  setSize(articleName: string, event: Event): void {
    const size = (event.target as HTMLSelectElement).value;
    this.selectedSizes.update((selected) => ({ ...selected, [articleName]: size }));
  }

  previousVariant(articleName: string, total: number): void {
    this.selectedVariants.update((selected) => ({ ...selected, [articleName]: ((selected[articleName] || 0) - 1 + total) % total }));
  }

  nextVariant(articleName: string, total: number): void {
    this.selectedVariants.update((selected) => ({ ...selected, [articleName]: ((selected[articleName] || 0) + 1) % total }));
  }

  whatsappUrl(articleName: string, variantName: string, size?: string): string {
    const sizeMessage = size ? ` Talle elegido: ${size}.` : ' Es un artículo sin talle.';
    return `https://wa.me/${MIGUEL_BADONE.whatsapp}?text=${encodeURIComponent(`Hola Miguel, vi tu catálogo de equipamiento y quiero consultar por ${articleName}, ${variantName}.${sizeMessage} ¿Tenés disponibilidad y precio?`)}`;
  }
}
