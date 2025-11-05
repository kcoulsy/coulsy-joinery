# Enterprise SEO Guide for Geo-Targeting Sites

## Overview
This guide covers best practices for geo-targeting SEO sites with hundreds of location-service combinations. Your site uses a dynamic template system (`[location]-[service].astro`) that generates location-specific pages.

## Current Implementation ✅

### What You're Doing Right:
1. **Dynamic Location Pages**: Using `[location]-[service].astro` pattern
2. **Location-Specific Schema**: Each page has LocalBusiness schema with geo coordinates
3. **Location Injection**: Using `locationInText` and `cleanLocationName` in content
4. **Nearby Areas**: Internal linking with `NearbyAreas` component
5. **Canonical URLs**: Proper canonical tags in Layout
6. **Sitemap Generation**: Dynamic sitemap with all location-service combinations
7. **Unique Titles**: `pageTitle` includes location name

## Critical SEO Issues for Geo-Targeting Sites

### 1. **Duplicate Content Prevention** ⚠️

**Problem**: Google penalizes sites with thin, duplicate content across location pages.

**Solutions**:

#### A. Ensure Unique Content Per Page
- ✅ You're already injecting location names (`locationInText`)
- ✅ Location-specific paragraphs (lines 143-152 in joinery.astro)
- **RECOMMENDATION**: Add more location-specific content:

```astro
{
  cleanLocationName && (
    <div class="location-specific-content">
      <h3>Why Choose Us in {cleanLocationName}?</h3>
      <p>
        {cleanLocationName} has a unique architectural character, from 
        [specific building types]. Whether you're in [neighborhood 1] or 
        [neighborhood 2], I understand the local building styles and can 
        provide joinery that complements the area's heritage.
      </p>
      <p>
        I've worked on numerous projects in {cleanLocationName}, including 
        [specific examples if available]. My local knowledge means I understand 
        planning requirements, building regulations, and the specific challenges 
        of working in this area.
      </p>
    </div>
  )
}
```

#### B. Add Location-Specific FAQs
```typescript
// In pageMeta.ts, enhance FAQ schema with location-specific questions
const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": `Do you serve ${cleanLocationName}?`,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": `Yes, I regularly work in ${cleanLocationName} and surrounding areas. I'm familiar with local building styles, planning requirements, and can provide expert joinery services throughout ${cleanLocationName}.`
      }
    },
    // ... more location-specific FAQs
  ]
};
```

### 2. **Canonical URLs** ✅

**Current Status**: You have canonical URLs set up correctly.

**Verification Checklist**:
- ✅ Each location page has unique canonical URL
- ✅ Canonical points to the correct location-service combination
- ✅ No self-referencing canonicals
- ✅ No circular canonical chains

**Recommendation**: Add canonical verification in your build process.

### 3. **Schema Markup Enhancement** 🎯

**Current**: Good LocalBusiness schema with geo coordinates.

**Enhancements**:

#### A. Add ServiceArea Schema
```json
{
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "serviceArea": {
    "@type": "GeoCircle",
    "geoMidpoint": {
      "@type": "GeoCoordinates",
      "latitude": "53.959",
      "longitude": "-1.082"
    },
    "geoRadius": {
      "@type": "Distance",
      "name": "30 miles"
    }
  },
  "areaServed": [
    {
      "@type": "City",
      "name": "York",
      "sameAs": "https://en.wikipedia.org/wiki/York"
    },
    // Add specific cities you serve
  ]
}
```

#### B. Add Place Schema for Each Location
```json
{
  "@context": "https://schema.org",
  "@type": "Place",
  "name": "York",
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": "53.959",
    "longitude": "-1.082"
  },
  "containedIn": {
    "@type": "State",
    "name": "North Yorkshire"
  }
}
```

### 4. **Internal Linking Strategy** 🔗

**Current**: Good - You have NearbyAreas component.

**Enhancements**:

#### A. Location Cluster Pages
Create hub pages for major locations:
- `/joinery-services/york` - Links to all York-specific services
- `/joinery-services/harrogate` - Links to all Harrogate services

#### B. Related Services Links
On each location-service page, link to:
- Same location, different services
- Nearby locations, same service
- Parent service page (without location)

#### C. Breadcrumb Enhancement
Your breadcrumbs are good. Consider adding:
```
Home > Joinery Services > [Service] > [Location]
```

### 5. **Content Uniqueness Requirements** 📝

**Google's Guidelines for Geo-Targeting**:
- Minimum 300-500 words of unique content per page
- Location-specific information (local landmarks, neighborhoods, etc.)
- Unique value propositions per location
- Real, verifiable information

**Your Current Content**:
- ✅ ~400-500 words per page
- ✅ Location name injected in multiple places
- ✅ Location-specific paragraph (lines 143-152)
- ⚠️ Could use more location-specific details

**Recommendations**:

1. **Add Location-Specific Sections**:
```astro
{
  cleanLocationName && (
    <section class="location-highlights">
      <h2>Joining {cleanLocationName}'s Properties</h2>
      <p>
        {cleanLocationName} features diverse property types, from 
        [heritage/period/modern] homes in [neighborhood] to 
        [commercial/residential] developments in [area]. My experience 
        working in {cleanLocationName} means I understand:
      </p>
      <ul>
        <li>Local building regulations and planning requirements</li>
        <li>Characteristic architectural styles of {cleanLocationName}</li>
        <li>Common joinery challenges in {cleanLocationName} properties</li>
        <li>Materials and finishes that complement {cleanLocationName}'s aesthetic</li>
      </ul>
    </section>
  )
}
```

2. **Add Location-Specific Case Studies** (if available):
```astro
{
  cleanLocationName && (
    <section class="local-projects">
      <h2>Recent Projects in {cleanLocationName}</h2>
      <p>
        I've completed numerous joinery projects in {cleanLocationName}, 
        including [service type] for [property type] in [neighborhood]. 
        Each project showcases my commitment to quality craftsmanship 
        and understanding of {cleanLocationName}'s architectural heritage.
      </p>
    </section>
  )
}
```

### 6. **Hreflang & Alternate Links** 🌍

**For Same Language, Different Locations**:
You don't need `hreflang` (that's for different languages), but consider:

#### A. Location Alternates
If you have multiple ways to access the same location (e.g., `/york-joinery` vs `/joinery-services/york-joinery`), use canonicalization.

#### B. Rel="Alternate" for Mobile
If you have separate mobile URLs (unlikely with Astro), use:
```html
<link rel="alternate" media="only screen and (max-width: 640px)" href="[mobile-url]" />
```

### 7. **Meta Tags Optimization** 🏷️

**Current**: Good unique titles and descriptions.

**Enhancements**:

#### A. Title Tags
Current format: `[Service] in [Location] | [Description]`
✅ Good length (50-60 chars)
✅ Includes location
✅ Includes service

**Recommendation**: Vary title formats:
- `[Service] [Location] - Expert [Service] in [Location]`
- `[Location] [Service] | Professional [Service] Services`
- `Local [Service] in [Location] | [Your Name]`

#### B. Meta Descriptions
Current: Good but could be more location-specific.

**Enhancement**:
```typescript
const enhancedDescription = location 
  ? `Professional ${formattedServiceName.toLowerCase()} services in ${cleanLocationName}, Yorkshire. Expert local joiner with 35+ years experience. Serving ${cleanLocationName} and surrounding areas. City & Guilds qualified, fully insured. Free quotes available.`
  : defaultDescription;
```

### 8. **Image Optimization** 🖼️

**Current**: Using OptimizedImage component ✅

**Enhancements**:
- Add location to alt text: `alt="Bespoke joinery work in ${cleanLocationName}"`
- Consider location-specific images (if available)
- Ensure all images have descriptive, location-aware alt text

### 9. **URL Structure** 🔗

**Current**: `/joinery-services/[location]-[service]`
✅ Clean, descriptive
✅ Hierarchical
✅ Includes location and service

**Best Practices**:
- ✅ Short, descriptive URLs
- ✅ Consistent pattern
- ✅ No parameters or IDs
- ✅ Location first, then service (or vice versa - be consistent)

**Your Pattern**: `[location]-[service]` ✅ Good

### 10. **Sitemap Optimization** 🗺️

**Current**: Dynamic sitemap generation ✅

**Recommendations**:

#### A. Priority Levels
```typescript
// Main location pages (York, Harrogate, Wetherby) - higher priority
priority: location === "york" || location === "harrogate" || location === "wetherby" 
  ? "0.9" 
  : "0.7"

// Main service pages - higher priority
priority: service === "kitchen-installers" || service === "garden-offices"
  ? "0.9"
  : "0.7"
```

#### B. Last Modified Dates
Update `lastmod` when content changes:
```typescript
lastmod: new Date().toISOString().split('T')[0] // Current date
```

#### C. Change Frequency
```typescript
changefreq: location ? "monthly" : "weekly" // Location pages change less frequently
```

### 11. **Google Search Console Monitoring** 📊

**Essential Checks**:

1. **Coverage Report**:
   - Monitor indexing status of location pages
   - Check for duplicate content warnings
   - Verify canonicalization is working

2. **Performance Report**:
   - Track which location-service combinations rank
   - Monitor click-through rates
   - Identify underperforming pages

3. **Core Web Vitals**:
   - Monitor page speed for location pages
   - Check for layout shifts
   - Ensure mobile usability

### 12. **Content Quality Signals** ⭐

**To Avoid Thin Content Penalties**:

1. **Word Count**: Minimum 300-500 words ✅ You have this
2. **Unique Value**: Location-specific information ✅ Partially
3. **User Intent**: Answers location-specific questions ✅ Yes
4. **E-E-A-T**: Experience, Expertise, Authoritativeness, Trust ✅ Yes
5. **Freshness**: Regular updates ✅ Can improve

**Recommendations**:
- Add location-specific "Why Choose Us" sections
- Include local building regulations/planning info
- Add location-specific service areas
- Mention local landmarks or neighborhoods

### 13. **Local SEO Signals** 📍

**Beyond Schema Markup**:

1. **NAP Consistency**: Name, Address, Phone
   - ✅ Consistent across site
   - ✅ In schema markup
   - ✅ In contact page

2. **Google Business Profile**:
   - Ensure GMB listing includes all service areas
   - Add location-specific posts
   - Respond to reviews mentioning locations

3. **Citations**:
   - Local directories
   - Industry-specific directories
   - Location-specific listings

### 14. **Technical SEO Checklist** ✅

- [x] Unique titles per location page
- [x] Unique descriptions per location page
- [x] Canonical URLs set correctly
- [x] Schema markup with geo coordinates
- [x] Mobile-responsive design
- [x] Fast page load times
- [x] XML sitemap generated
- [x] Robots.txt configured
- [ ] Hreflang (if needed for multi-language)
- [ ] Structured data testing (Google Rich Results Test)

### 15. **Content Strategy by Location** 📍

**For Major Locations** (York, Harrogate, Wetherby):
- More detailed content
- Local landmarks mention
- Neighborhood-specific information
- Case studies/testimonials

**For Smaller Locations**:
- Standard template with location name
- Nearby major cities mentioned
- Service area radius info

## Implementation Priority

### High Priority (Do First):
1. ✅ Verify canonical URLs are unique per page
2. ✅ Add more location-specific content sections
3. ✅ Enhance meta descriptions with location context
4. ✅ Add location-specific FAQs
5. ✅ Monitor Google Search Console for issues

### Medium Priority:
1. Add location-specific schema enhancements
2. Create location hub pages
3. Enhance internal linking
4. Add location-specific alt text to images

### Low Priority:
1. Create location-specific blog posts
2. Add location-specific testimonials
3. Create location-specific landing pages

## Testing & Validation

### Tools to Use:
1. **Google Search Console**: Monitor indexing and performance
2. **Rich Results Test**: Validate schema markup
3. **PageSpeed Insights**: Check performance
4. **Mobile-Friendly Test**: Verify mobile usability
5. **Screaming Frog**: Crawl site for SEO issues

### Key Metrics to Monitor:
- Indexing rate of location pages
- Average position for location keywords
- Click-through rate by location
- Bounce rate by location page
- Core Web Vitals scores

## Common Pitfalls to Avoid

1. ❌ **Exact Duplicate Content**: Same text, just swapped location names
2. ❌ **Thin Content**: Less than 300 words per page
3. ❌ **Keyword Stuffing**: Over-optimizing location names
4. ❌ **Broken Internal Links**: Dead links between location pages
5. ❌ **Missing Canonicals**: Duplicate content issues
6. ❌ **Poor Mobile Experience**: Slow or unusable on mobile
7. ❌ **Schema Errors**: Invalid or missing structured data

## Conclusion

Your geo-targeting implementation is solid. The main areas for improvement are:
1. Adding more unique, location-specific content
2. Enhancing schema markup
3. Monitoring performance in Search Console
4. Ensuring content quality signals

Focus on making each location page feel genuinely useful and unique, not just a template with swapped names.
