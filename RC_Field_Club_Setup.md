# RC Field Club — Shopify theme setup

Version 1.0 · 21 October 2026

## What this is

An original Shopify Online Store theme using RC Field Club's orange, charcoal and cream design. Upload **RC_Field_Club_Shopify_Theme.zip** directly; do not unzip it first. The ZIP contains the theme folders at its root.

The theme includes responsive navigation, editable home sections, product and variant selection, product search, collections, a native cart and checkout handoff, a configurable RC finder, exact-model spare-parts links, a My Garage page, policy links, a password page and a 404 page. Below-the-fold reveals run once and respect reduced-motion preferences. Product images use Shopify's responsive image CDN.

A theme is the storefront layer. This package does not create a Shopify account or plan, products, supplier arrangements, stock, payment setup, policy text, or customer records. It does not migrate the former ChatGPT sign-in or saved garage database. No messages were sent and the existing RC Field Club website was not changed.

## 1. Upload and preview

1. Create your Shopify store and select a plan with an Online Store when you are ready.
2. In Shopify admin, open **Online Store → Themes**.
3. In the theme library, choose **Import theme / Add theme → Upload ZIP file** (the wording can vary).
4. Upload **RC_Field_Club_Shopify_Theme.zip**.
5. Open the theme editor and preview the theme before publishing it. Keep the storefront password enabled during setup.

This is a custom theme, not a Shopify Theme Store listing or an officially certified theme. Its code has passed Shopify theme validation, but it has not been imported into a live store in this session.

## 2. Add your actual range

Create products in Shopify using your agreed selling prices, stock, packages, SKU values, weights, descriptions and authorised product images. Create separate variants for battery count, colour or other package choices. The theme displays those actual variants and their availability.

The old prototype's competitor images and reference prices are intentionally not seeded into this theme. There is no hidden catalogue or invented stock. Until you add products and select a featured collection, the home page shows its designed empty state and original aircraft graphic.

Create collections such as Planes, Cars, Boats, Helicopters and Spare Parts. Connect your supplier or fulfilment app separately. The theme itself does not place supplier orders or synchronise inventory.

In the theme editor:

- Under **Theme settings → Brand and compatibility**, choose your logo, colours and Spare Parts collection.
- In **Hero**, choose a featured product or your own hero image, update the text and choose a button link.
- In **Featured Collection**, select the range to show. It displays up to eight products.
- In **Editorial**, edit the guidance text and three points.
- Edit the Header announcement and menus. Use only delivery or service claims you can honour.

## 3. Configure Find My RC

The home page includes the Finder section immediately after Editorial. The Hero's **Find my RC** link and Editorial button open it by default. Custom link destinations still take precedence; leave those fields blank to use the home-page finder. Localised storefront routes are preserved.

In the theme editor:

1. Open the **Home page** and select **Finder**.
2. Add an **RC recommendation** block for each product you have verified. Up to 30 blocks are supported.
3. For each block, select the product, category, minimum experience, suitable space, primary goal, why it fits, and limitations or extras.
4. Save and test the home-page links and recommendations.

Until real products are selected, the finder shows a clear “recommendations coming soon” message, links to the range, and disables matching. It does not create sample stock. With recommendations configured, JavaScript hides the results until the customer submits their preferences. Without JavaScript, the curated range remains visible for browsing.

A separate page is optional: create **Find My RC**, assign the **page.finder** template, configure its own recommendation blocks, and select that page in the Hero and Editorial link settings. Recommendation blocks are configured independently on each template. Add the page or the home-page finder anchor to your Shopify main menu if desired.

With JavaScript enabled, the space choices follow the selected interest: planes and helicopters offer an open flying field or large clear indoor hall; cars offer open outdoor ground or a large clear indoor hall; boats offer calm open water. A compatible existing selection is retained; otherwise the first suitable space is selected. Changing preferences clears the previous results until the customer submits again. These broad choices do not establish that a particular model is suitable: each recommendation still needs a verified space setting.

The finder is a curated filter, not AI or an automatic scan of every product. It matches the selected category, space and goal, excludes models above the customer's skill level, and checks the cheapest currently available variant against the product budget. It displays all matching configured options. Use one block per product to avoid duplicates.

Only assign beginner suitability after verifying the product. The budget excludes shipping, taxes and any additional equipment. Explain missing transmitter batteries, chargers or other required extras in the product description and recommendation text. No matches produces an explicit empty result rather than substituting an unsuitable model.

## 4. Connect exact-model spare parts

Compatibility uses ordinary Shopify product tags. Use lowercase tags beginning `rc-model-`, followed by a precise model/version slug.

Example:

| Product | Tag |
| --- | --- |
| RC ERA C129 V2 helicopter | `rc-model-c129-v2` |
| A part verified for C129 V2 | `rc-model-c129-v2` |
| A part also verified for another model | Add that second model's exact tag too |

Add parts to the Spare Parts collection and select that collection in Theme settings. Every tagged model receives a **Find matching spare parts** link. The collection's model selector and those links use Shopify's native tag filtering, including pagination. The selector lists only model tags represented in that collection.

Use one primary model tag on a vehicle product. A part may have several compatible-model tags. Similar names do not establish compatibility: tag only verified matches and explain version/front/rear choices in the part's variants and description. A model with no matching parts receives an empty collection result.

## 5. Customer accounts and My Garage

1. Enable Shopify customer accounts. This version is designed to link to Shopify-hosted customer accounts; it does not supply legacy account templates.
2. Create a **My Garage** page, preferably with handle `my-garage`.
3. Assign the **page.garage** / **garage** template and add it to the main menu.
4. Test with a real test customer account and a test order.

The header's Account link goes to Shopify's account area for profile and full order management. The storefront My Garage page reads the signed-in customer's Shopify orders in pages of ten, shows ordered product names, and links to matching parts using the tags above. It does not maintain a separate customer database or expose a customer ID in a query string.

Check storefront sign-in persistence after returning from Shopify's hosted account pages. Test logged-out and empty-account states, two distinct customers, and an order whose product was deleted. Genuine orders must be associated with the signed-in customer; the theme does not fabricate sample purchases. Deleted products remain named in order history but lose product/parts links. Manual saved-model management and the former prototype's saved garage records are not included.

## 6. Policies and navigation

Enter your final privacy, refund, shipping and terms policies under Shopify's policy settings. The footer automatically lists policies with content. It does not import the earlier draft wording or unfinished business details.

Create main-menu links to your product collections, Find My RC, Spare Parts and My Garage. Set the Header menu in the theme editor. Use the Footer menu for additional pages. Generic content pages use the default page template.

If Shopify only offers templates from your published theme when assigning a page, prepare the theme and keep the store password-protected, then publish it before assigning the custom page templates. Preview the completed pages before opening the store to customers.

## 7. Store configuration and final checks

Before accepting orders, configure payments, shipping regions/rates, taxes, inventory locations, supplier fulfilment and your customer support contact. These are Shopify settings or app integrations, not theme controls.

Run a Shopify test order and check:

- Desktop and mobile layouts, all menus and images.
- Every package's price and sold-out behaviour, cart quantities and removal.
- Checkout totals, shipping, payment flow and the test order's fulfilment destination.
- Finder recommendations against actual package contents and available variants.
- Spare-part compatibility, including similarly named model versions.
- Account login, account separation, real order history and parts links.
- Final policy content, contact details and order notification settings.

The theme's native product/cart forms hand off to Shopify. Orders and notifications will follow your store configuration once you activate it. No live payment, email or fulfilment operation was performed while building this package.

## Validation completed

All 38 theme files passed the Shopify Liquid theme validator with its bundled documentation fallback (the latest remote documentation cache was unavailable). JSON, templates, assets, snippets and translation references were checked. JavaScript checks covered the finder constraints, no-match state, exact budget boundary, parts-filter routes, and variant price/availability updates.

A Shopify-hosted render, live checkout/account test and browser visual smoothness test were not available in this session. These remain store-setup checks, not confirmed results.

## References

- Theme architecture: https://shopify.dev/docs/storefronts/themes/architecture
- Theme performance: https://shopify.dev/docs/storefronts/themes/best-practices/performance
- Shopify route objects: https://shopify.dev/docs/api/liquid/objects/routes

All editable source is included inside the theme ZIP. No build step, external animation library or application server is required.

## Finder development checks

Run `node tests/finder-browser.cjs` from the repository root. It requires Playwright and Chromium, both provided in this cloud environment. Set `CHROMIUM_EXECUTABLE_PATH` if Chromium is installed elsewhere.

This check loads the actual finder form and theme JavaScript with isolated product fixtures. It exercises interest-dependent space options, preserving compatible selections, clearing stale results, initial result hiding, category/experience/space/goal/budget matching, sold-out exclusion, an exact decimal budget boundary, no matches, theme-editor reload, and mobile form layout. It does not render the full Shopify Liquid theme or test real store products. Run Shopify Theme Check separately.
