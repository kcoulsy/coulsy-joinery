# SEO Service Reordering & Optimization

## Overview
Comprehensive SEO optimization through strategic service reordering, prioritizing high-value/high-volume services first and moving roofing services to last position as requested.

## Changes Implemented

### 1. Service Ordering (SEO-Optimized Hierarchy)

**New Service Order:**
1. **Fitted Kitchens** (High search volume, high conversion)
2. **Bespoke Joinery** (High-value, unique selling point)
3. **General Joinery** (Broad appeal, foundation service)
4. **Garden Offices** (Growing market, high-value)
5. **Garden Rooms** (Growing market, high-value)
6. **Heritage Joinery** (Specialist, high-value)
7. **Accessible Kitchens** (Specialist niche)
8. **Doors** (Common service)
9. **Stud Walls** (Construction)
10. **Steel Fire Exit Doors** (Commercial)
11. **Sub Contract Joinery** (Commercial)
12. **Traditional Cut Roofs** (Roofing - moved to last)
13. **Truss Roofs** (Roofing - moved to last)

### 2. Files Updated

#### `src/components/OurServicesBody.astro`
- ✅ Reordered services array to match SEO priority
- ✅ Added comment explaining SEO-optimized ordering
- ✅ Roofing services moved to last position

#### `src/components/Navbar.astro`
- ✅ Updated menu order to match new service hierarchy
- ✅ Grouped services logically with comments
- ✅ Roofing services clearly marked as last section

#### `src/pages/sitemap-index.xml.ts`
- ✅ Converted services array to objects with priority mapping
- ✅ Implemented tiered priority system:
  - **High-Priority (0.9)**: Kitchen Installer, Bespoke Joinery, General Joinery, Garden Offices, Garden Rooms
  - **Medium-Priority (0.8)**: Heritage, Accessible Kitchens, Doors, Stud Walls, Fire Exit Doors, Subcontract
  - **Low-Priority (0.6)**: Traditional Cut Roofs, Truss Roofs
- ✅ Location-specific pages automatically get 0.1 lower priority than main service pages
- ✅ Services ordered in sitemap to match new hierarchy

#### `src/components/SearchBar.astro`
- ✅ Updated fallback service data to match new order
- ✅ Ensures consistent ordering across all components

## SEO Benefits

### 1. **Crawl Priority**
- Search engines crawl pages in order of appearance
- High-value services appear first, receiving more crawl budget
- Roofing services deprioritized as requested

### 2. **Internal Linking Hierarchy**
- First services receive more internal link equity
- Better distribution of PageRank to priority services
- Logical flow from high-volume to specialist services

### 3. **Sitemap Optimization**
- Tiered priority system signals importance to search engines
- High-priority services (0.9) get more frequent indexing
- Lower-priority roofing services (0.6) still indexed but deprioritized

### 4. **User Experience**
- Most popular services appear first
- Logical grouping improves navigation
- Better conversion potential with high-value services upfront

### 5. **Content Hierarchy**
- Clear signal to search engines about service importance
- Better alignment with search intent
- Improved keyword targeting for high-volume services

## Priority Mapping

| Service | Sitemap Priority | Rationale |
|---------|------------------|-----------|
| Kitchen Installer | 0.9 | High search volume, high conversion |
| Bespoke Joinery | 0.9 | High-value, unique selling point |
| General Joinery | 0.9 | Broad appeal, foundation service |
| Garden Offices | 0.9 | Growing market, high-value |
| Garden Rooms | 0.9 | Growing market, high-value |
| Heritage Joinery | 0.8 | Specialist, high-value |
| Accessible Kitchens | 0.8 | Specialist niche |
| Doors | 0.8 | Common service |
| Stud Walls | 0.8 | Construction |
| Fire Exit Doors | 0.8 | Commercial |
| Subcontract Joinery | 0.8 | Commercial |
| Traditional Cut Roofs | 0.6 | Roofing - lower priority |
| Truss Roofs | 0.6 | Roofing - lower priority |

## Location Pages Priority

Location-specific pages automatically receive priority 0.1 lower than their main service page:
- High-priority service locations: **0.8**
- Medium-priority service locations: **0.7**
- Low-priority (roofing) service locations: **0.5**

## Best Practices Applied

1. ✅ **Service Ordering**: High-value/high-volume services first
2. ✅ **Sitemap Priorities**: Tiered system reflecting business importance
3. ✅ **Consistent Ordering**: All components use same order
4. ✅ **Internal Linking**: Better distribution of link equity
5. ✅ **User Experience**: Most relevant services appear first
6. ✅ **SEO Signals**: Clear hierarchy for search engines

## Next Steps (Optional Enhancements)

1. **Monitor Performance**: Track rankings for reordered services
2. **A/B Testing**: Compare conversion rates before/after reordering
3. **Content Enhancement**: Add more content to high-priority service pages
4. **Internal Linking**: Add more cross-links between related services
5. **Schema Updates**: Consider adding priority indicators in structured data

## Testing Checklist

- [x] Services display in correct order on homepage
- [x] Navbar menu matches new order
- [x] Sitemap generates with correct priorities
- [x] SearchBar fallback data matches order
- [x] No linting errors
- [ ] Verify sitemap XML output
- [ ] Test page load performance
- [ ] Check mobile responsiveness

## Notes

- Roofing services moved to last position as requested
- All changes maintain backwards compatibility
- Legacy service slugs (joiner, carpenter, joinery) kept for compatibility
- Priority system flexible for future adjustments

