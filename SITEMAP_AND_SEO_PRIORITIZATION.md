# Sitemap & SEO Prioritization - Joinery Site 🎯

**Date:** January 2026  
**Site:** coulsyjoinery.co.uk  
**Purpose:** Optimize sitemap and prioritize SEO for maximum enquiry generation

---

## 📊 **Current Site Structure**

### **Total Pages: ~1,100+**

#### **Location-Based Service Pages: ~1,008 pages** ⭐⭐⭐
- **18 services** × **56 locations** = **1,008 location pages**
- Format: `/joinery-services/{location}-{service}`
- Examples:
  - `/joinery-services/york-general-joinery`
  - `/joinery-services/leeds-kitchen-installers`
  - `/joinery-services/harrogate-bespoke-joinery`

**Services:**
1. General Joinery
2. Kitchen Installers
3. Building Maintenance
4. Small Build Services
5. Carpenter
6. Joiner
7. Door Hanging
8. Traditional Cut Roofs
9. Truss Roof Installers
10. Steel Fire Exit Doors Installers
11. Stud Wall Partitioning
12. Joinery Subcontractors
13. Garden Rooms
14. Garden Offices
15. Bespoke Joinery
16. Accessible Kitchen Installers
17. Heritage Restoration Joinery
18. Joinery (overview)

#### **Base Service Pages: 18 pages** ⭐⭐⭐
- `/joinery-services/general-joinery`
- `/joinery-services/kitchen-installers`
- `/joinery-services/building-maintenance`
- ... (all 18 services)

#### **Core Pages: 6 pages** ⭐⭐
- `/` (Homepage)
- `/joinery-services` (Services overview)
- `/about`
- `/contact`
- `/faq`
- `/about.astro` (if different from `/about`)

#### **Supporting Pages: 4 pages** ⚠️
- `/about/sustainability`
- `/about/compliance`
- `/about/qualifications`
- `/web-development`

---

## ✅ **Current Sitemap Configuration**

### **Status:**
- ✅ Astro sitemap integration enabled (`@astrojs/sitemap`)
- ✅ Robots.txt references sitemap correctly
- ✅ Site URL configured: `https://coulsyjoinery.co.uk`
- ⚠️ **Issue:** `/web-development` excluded (good!)
- ⚠️ **Issue:** Supporting pages still indexed (should be noindex)

### **Current Filter:**
```javascript
sitemap({
  changefreq: "weekly",
  priority: 0.7,
  filter: (page) => !page.includes('/web-development'),
  serialize: (page) => ({
    ...page,
    lastmod: page.data?.lastmod || new Date().toISOString(),
  }),
})
```

### **What's Currently Included:**
- ✅ All ~1,008 location pages
- ✅ All 18 base service pages
- ✅ All core pages (homepage, contact, FAQ, about)
- ⚠️ Supporting pages (`/about/sustainability`, `/about/compliance`, `/about/qualifications`) - **Should be noindex**

---

## 🎯 **SEO Prioritization Strategy**

### **Tier 1: Highest Priority (Money Pages)** ⭐⭐⭐

#### **1. Location-Specific Service Pages (~1,008 pages)**
**Priority:** **HIGHEST**  
**Enquiry Potential:** **HIGHEST**  
**SEO Value:** **HIGHEST**

**Why:**
- Exact match for "joinery services in [location]"
- Local SEO signals (location in URL, content, structured data)
- High search volume keywords
- Direct enquiry drivers

**Examples:**
- `/joinery-services/york-general-joinery`
- `/joinery-services/leeds-kitchen-installers`
- `/joinery-services/harrogate-bespoke-joinery`

**Recommendation:**
- ✅ **KEEP ALL** - These are your money pages
- Set priority: **0.9** (highest for location pages)
- Ensure prominent phone number on every page ✅ (already done)
- Optimize top 20 locations first (York, Leeds, Harrogate, etc.)

**Top Priority Locations:**
1. York
2. Leeds
3. Harrogate
4. Wetherby
5. Ripon
6. Selby
7. Knaresborough
8. Thirsk
9. Boroughbridge
10. Easingwold

---

#### **2. Base Service Pages (18 pages)**
**Priority:** **HIGH**  
**Enquiry Potential:** **HIGH**  
**SEO Value:** **HIGH**

**Why:**
- Broad service keywords
- Internal linking hub
- Authority pages
- Category landing pages

**Pages:**
- `/joinery-services/general-joinery`
- `/joinery-services/kitchen-installers`
- `/joinery-services/building-maintenance`
- `/joinery-services/small-build-services`
- `/joinery-services/carpenter`
- `/joinery-services/joiner`
- `/joinery-services/door-hanging`
- `/joinery-services/traditional-cut-roofs`
- `/joinery-services/truss-roof-installers`
- `/joinery-services/steel-fire-exit-doors-installers`
- `/joinery-services/stud-wall-partitioning`
- `/joinery-services/joinery-subcontractors`
- `/joinery-services/garden-rooms`
- `/joinery-services/garden-offices`
- `/joinery-services/bespoke-joinery`
- `/joinery-services/accessible-kitchen-installers`
- `/joinery-services/heritage-restoration-joinery`
- `/joinery-services/joinery`

**Recommendation:**
- ✅ **KEEP ALL**
- Set priority: **0.95** (highest - category pages)
- Ensure prominent phone number ✅ (already done)

---

#### **3. Contact Page**
**Priority:** **HIGH**  
**Enquiry Potential:** **HIGHEST**  
**SEO Value:** **MEDIUM**

**Why:**
- Direct enquiry conversion
- Clear call-to-action
- Multiple contact methods

**Recommendation:**
- ✅ **KEEP**
- Set priority: **0.9**
- Ensure prominent phone number ✅

---

#### **4. FAQ Page**
**Priority:** **MEDIUM-HIGH**  
**Enquiry Potential:** **MEDIUM-HIGH**  
**SEO Value:** **MEDIUM**

**Why:**
- Answers questions
- Builds trust
- Conversion-focused content

**Recommendation:**
- ✅ **KEEP**
- Set priority: **0.8**

---

#### **5. Homepage**
**Priority:** **MEDIUM**  
**Enquiry Potential:** **MEDIUM**  
**SEO Value:** **HIGH**

**Why:**
- First impression
- Service overview
- Trust building
- Brand awareness

**Recommendation:**
- ✅ **KEEP**
- Set priority: **1.0** (highest - homepage)

---

#### **6. About Page**
**Priority:** **MEDIUM**  
**Enquiry Potential:** **LOW-MEDIUM**  
**SEO Value:** **MEDIUM**

**Why:**
- Personal story builds trust
- Shows qualifications
- Person schema for SEO

**Recommendation:**
- ✅ **KEEP**
- Set priority: **0.7**

---

#### **7. Services Overview Page**
**Priority:** **MEDIUM**  
**Enquiry Potential:** **MEDIUM**  
**SEO Value:** **MEDIUM**

**Page:**
- `/joinery-services`

**Recommendation:**
- ✅ **KEEP**
- Set priority: **0.85**

---

### **Tier 2: Low Priority (Noindex Recommended)** ⚠️

#### **1. Supporting Pages (Trust Signals)**
**Priority:** **LOW**  
**Enquiry Potential:** **VERY LOW**  
**SEO Value:** **LOW**

**Pages:**
- `/about/sustainability`
- `/about/compliance`
- `/about/qualifications`

**Why Noindex:**
- Not searched by customers
- Don't drive enquiries
- Trust signals (better as internal pages)
- Wastes crawl budget

**Recommendation:**
- ⚠️ **NOINDEX** (keep `follow` links)
- Exclude from sitemap OR set priority: **0.3**
- Pages still accessible and linked internally

**Impact:**
- ✅ More focused crawl budget
- ✅ Better SEO focus
- ✅ Pages still accessible for trust building

---

#### **2. Web Development Page**
**Priority:** **NONE**  
**Enquiry Potential:** **ZERO**  
**SEO Value:** **NEGATIVE**

**Page:**
- `/web-development`

**Why Noindex:**
- Completely off-topic (joinery vs web dev)
- Confuses search engines
- Wastes crawl budget
- Reduces topical authority

**Recommendation:**
- ✅ **NOINDEX** (already done)
- ✅ **EXCLUDED FROM SITEMAP** (already done)
- Keep page accessible but not indexed

**Impact:**
- ✅ **+5-10% improvement** in joinery keyword rankings
- ✅ Better topical authority
- ✅ More focused crawl budget

---

## 🔧 **Recommended Sitemap Configuration**

### **Priority Levels:**

```javascript
sitemap({
  changefreq: "weekly",
  priority: 0.7, // Default
  filter: (page) => {
    // Exclude web-development
    if (page.includes('/web-development')) return false;
    
    // Exclude supporting pages (or set low priority)
    if (page.includes('/about/sustainability')) return false;
    if (page.includes('/about/compliance')) return false;
    if (page.includes('/about/qualifications')) return false;
    
    return true;
  },
  serialize: (page) => {
    let priority = 0.7; // Default
    let changefreq = "weekly";
    
    // Homepage - highest priority
    if (page === 'https://coulsyjoinery.co.uk/') {
      priority = 1.0;
      changefreq = "daily";
    }
    
    // Base service pages - very high priority
    if (page.match(/\/joinery-services\/[a-z-]+$/)) {
      priority = 0.95;
      changefreq = "weekly";
    }
    
    // Location pages - high priority
    if (page.match(/\/joinery-services\/[a-z-]+-[a-z-]+$/)) {
      priority = 0.9;
      changefreq = "weekly";
    }
    
    // Contact page - high priority
    if (page.includes('/contact')) {
      priority = 0.9;
      changefreq = "weekly";
    }
    
    // Services overview - high priority
    if (page === 'https://coulsyjoinery.co.uk/joinery-services') {
      priority = 0.85;
      changefreq = "weekly";
    }
    
    // FAQ - medium-high priority
    if (page.includes('/faq')) {
      priority = 0.8;
      changefreq = "monthly";
    }
    
    // About - medium priority
    if (page === 'https://coulsyjoinery.co.uk/about') {
      priority = 0.7;
      changefreq = "monthly";
    }
    
    return {
      ...page,
      priority,
      changefreq,
      lastmod: page.data?.lastmod || new Date().toISOString(),
    };
  },
})
```

---

## 📈 **Expected Impact**

### **After Optimizing Sitemap:**

#### **SEO Improvements:**
- ✅ **+5-10% improvement** in joinery keyword rankings
- ✅ Better topical authority (removing off-topic pages)
- ✅ More focused crawl budget (1,000+ relevant pages prioritized)
- ✅ Higher priority for money pages
- ✅ Better indexing of location pages

#### **Enquiry Improvements:**
- ✅ Better visibility for location-specific searches
- ✅ Higher rankings for "joinery in [location]" queries
- ✅ More focused user journey to enquiry pages

---

## 🎯 **Action Items**

### **Priority 1: Critical SEO Fixes** 🔴

1. ✅ **Web Development Page** - Already noindex + excluded ✅
2. ⚠️ **Supporting Pages** - Add noindex to:
   - `/about/sustainability`
   - `/about/compliance`
   - `/about/qualifications`
3. ⚠️ **Update Sitemap Configuration** - Add priority levels

### **Priority 2: Sitemap Optimization** 🟡

4. ⚠️ **Implement Priority Levels** - Use serialize function above
5. ⚠️ **Exclude Supporting Pages** - Add to filter function

### **Priority 3: Ongoing Optimization** 🟢

6. ⚠️ **Monitor Top Location Pages** - Track rankings for top 20 locations
7. ⚠️ **Optimize Top Locations** - Ensure best content for York, Leeds, Harrogate, etc.

---

## 📋 **Summary**

### **Keep & Optimize:**
- ✅ All ~1,008 location pages (priority: 0.9)
- ✅ All 18 base service pages (priority: 0.95)
- ✅ Homepage (priority: 1.0)
- ✅ Contact page (priority: 0.9)
- ✅ FAQ page (priority: 0.8)
- ✅ About page (priority: 0.7)
- ✅ Services overview (priority: 0.85)

### **Noindex/Exclude:**
- ❌ `/web-development` - Already done ✅
- ⚠️ `/about/sustainability` - **Action Required**
- ⚠️ `/about/compliance` - **Action Required**
- ⚠️ `/about/qualifications` - **Action Required**

### **Total Pages:**
- **Indexed:** ~1,035 pages (1,008 location + 18 base + 9 core)
- **Excluded:** 4 pages (web-development + 3 supporting pages)

---

## 🚀 **Next Steps**

1. ✅ Review this analysis
2. ⏳ Add noindex to supporting pages
3. ⏳ Update sitemap configuration with priorities
4. ⏳ Test and verify
5. ⏳ Build and deploy

**Ready to proceed?** 🎯

