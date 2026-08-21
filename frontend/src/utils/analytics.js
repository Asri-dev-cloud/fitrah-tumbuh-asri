// Analytics utility for Google Analytics (GA4) and Meta Pixel

const GA_ID = import.meta.env.VITE_GA_ID || 'G-HZJNZQLR7E';

// Track Page View (Useful for single page hash routing)
export const trackPageView = (pageName) => {
  const path = `#/${pageName}`;
  
  // Google Analytics Pageview
  if (window.gtag) {
    window.gtag('config', GA_ID, {
      page_title: pageName,
      page_path: path
    });
  }
  
  // Meta Pixel Pageview
  if (window.fbq) {
    window.fbq('track', 'PageView');
  }
};

// Track Form Submission (Lead capture)
export const trackFormSubmit = (formName, interestName) => {
  // Google Analytics Event
  if (window.gtag) {
    window.gtag('event', 'form_submission', {
      event_category: 'engagement',
      event_label: formName,
      interest: interestName
    });
  }
  
  // Meta Pixel Event
  if (window.fbq) {
    window.fbq('track', 'Lead', {
      content_name: formName,
      content_category: interestName
    });
  }
};

// Track Purchase/Click Action
export const trackPurchaseClick = (productTitle, priceText) => {
  // Try parsing numeric price
  let numericPrice = 0;
  if (priceText) {
    const matched = priceText.replace(/\D/g, '');
    if (matched) numericPrice = parseInt(matched, 10);
  }

  // Google Analytics Event
  if (window.gtag) {
    window.gtag('event', 'purchase_click', {
      event_category: 'ecommerce',
      event_label: productTitle,
      value: numericPrice
    });
  }
  
  // Meta Pixel Event
  if (window.fbq) {
    window.fbq('track', 'InitiateCheckout', {
      content_ids: [productTitle],
      value: numericPrice,
      currency: 'IDR'
    });
  }
};
