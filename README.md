# Flip&Co — V5 / Sales-ready static build

Standalone static commerce/editorial site for Flip&Co Cagliari.

## Structure
- Home / Shop / Collections / Collection / Brand Index / Product
- Cart / demo checkout / confirmation
- Legal + FAQ pages
- Admin import demo
- Single inventory source in `data/products.json`

## Deploy
Upload the repository contents to GitHub Pages. The project is static and requires no build step.

## V5 improvements
- Curated 9-product catalog with current official brand source links.
- Replaced broken homepage/product image endpoints with official image CDN URLs where available, with local fallbacks.
- Removed the duplicate DSQUARED2 editorial product.
- Added verified DSQUARED2 Kids jeans product.
- Fixed Shop filter/count rendering bug.
- Added official product-source link and availability disclaimer on PDP.
- Added cookie/technical-consent bar and stronger mobile/e-commerce polish.
- Checkout copy now behaves as an order-request flow until a real payment provider is connected.

## Production before go-live
- Replace remote catalog image URLs with licensed/local/CDN assets.
- Connect real inventory backend.
- Connect payment provider and order service.
- Complete legal/cookie configuration.
- Add production analytics, sitemap, robots and structured product data.


## V6 positioning
Flip&Co has two connected experiences: the **Online Edit** is a curated selection, while the **store** carries a broader physical selection and offers in-person styling. The site is for Uomo, Donna and Kids. “Ti facciamo il look” is the main human service bridge, available in store or via WhatsApp.
