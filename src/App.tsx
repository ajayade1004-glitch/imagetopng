/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { CookieBanner } from './components/CookieBanner';
import { HomePage } from './pages/HomePage';
import { FormatPage } from './pages/FormatPage';
import { GuidesHubPage } from './pages/GuidesHubPage';
import { GuideDetailPage } from './pages/GuideDetailPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { ReportBugPage } from './pages/ReportBugPage';
import { PrivacyPolicyPage } from './pages/PrivacyPolicyPage';
import { TermsPage } from './pages/TermsPage';
import { CookiePolicyPage } from './pages/CookiePolicyPage';
import { SecurityPage } from './pages/SecurityPage';
import { StatusPage } from './pages/StatusPage';
import { ImprintPage } from './pages/ImprintPage';
import { NotFoundPage } from './pages/NotFoundPage';
import { SUPPORTED_FORMATS } from './data/formats';
import { GUIDES_DATA } from './data/guides';

export default function App() {
  const [currentPath, setCurrentPath] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      return window.location.pathname || '/';
    }
    return '/';
  });

  // Listen to browser navigation (back/forward)
  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname || '/');
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Update dynamic document title, description, and canonical link
  useEffect(() => {
    let title = 'Image to PNG Converter – Convert Images to PNG Free';
    let description =
      'Free online Image to PNG converter. Convert JPG, WEBP, and photos to transparent PNG with 100% private in-browser speed and zero quality loss.';

    if (currentPath === '/' || currentPath === '' || currentPath === '/image-to-png') {
      title = 'Image to PNG Converter – Convert Images to PNG Free';
      description =
        'Free online Image to PNG converter. Convert JPG, WEBP, and photos to transparent PNG with 100% private in-browser speed and zero quality loss.';
    } else if (currentPath === '/guides' || currentPath === '/blog') {
      title = 'Blog & Guides – ImageToPNG Knowledge Hub';
      description =
        'Explore technical guides, format comparisons (PNG vs JPG, PNG vs WebP), alpha transparency insights, and compression optimization.';
    } else if (currentPath.startsWith('/guides/') || currentPath.startsWith('/blog/')) {
      const guideSlug = currentPath.replace('/guides/', '').replace('/blog/', '').replace(/\/$/, '');
      const guide = GUIDES_DATA.find((g) => g.slug === guideSlug);
      if (guide) {
        title = `${guide.metaTitle} | ImageToPNG`;
        description = guide.metaDescription;
      } else {
        title = 'Guide Not Found | ImageToPNG';
      }
    } else if (currentPath === '/about') {
      title = 'About Us – ImageToPNG Online Conversion Utility';
      description =
        'Learn about ImageToPNG, our mission for private client-side image conversion, and our zero-server-upload architecture.';
    } else if (currentPath === '/security') {
      title = 'Security & Data Protection – ImageToPNG';
      description =
        'Read about our zero-server-upload security architecture. Images are processed 100% locally inside your browser.';
    } else if (currentPath === '/status') {
      title = 'System Status & Diagnostics – ImageToPNG';
      description =
        'Live diagnostics, client-side engine availability, and browser graphic pipeline health.';
    } else if (currentPath === '/imprint') {
      title = 'Imprint / Impressum – ImageToPNG';
      description =
        'Statutory legal information, service provider details, and publication notices for ImageToPNG.';
    } else if (currentPath === '/contact') {
      title = 'Contact Us – ImageToPNG Support & Feedback';
      description =
        'Get in touch with the ImageToPNG engineering team for questions, feedback, or support regarding browser image conversion.';
    } else if (currentPath === '/report-bug') {
      title = 'Report a Bug – ImageToPNG Quality Control';
      description =
        'Report conversion failures, unsupported codecs, or browser-specific rendering bugs to help us improve ImageToPNG.';
    } else if (currentPath === '/privacy') {
      title = 'Privacy Policy – ImageToPNG 100% In-Browser Privacy';
      description =
        'Read our comprehensive privacy policy. Your images are converted 100% locally in your browser and never uploaded to remote servers.';
    } else if (currentPath === '/terms') {
      title = 'Terms of Use – ImageToPNG';
      description =
        'Review the terms of service governing your use of the ImageToPNG online image conversion utility.';
    } else if (currentPath === '/cookie-policy') {
      title = 'Cookie Policy – ImageToPNG';
      description =
        'Details regarding our minimal strictly essential cookies, zero third-party tracking, and local preference storage.';
    } else {
      const formatSlug = currentPath.replace('/', '').replace(/\/$/, '');
      const format = SUPPORTED_FORMATS.find((f) => f.slug === formatSlug);
      if (format) {
        title = `${format.sourceFormat} to PNG Converter – Free Online Conversion`;
        description = format.metaDescription;
      } else {
        title = '404 – Page Not Found | ImageToPNG';
        description = 'The requested converter page does not exist.';
      }
    }

    document.title = title;
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', description);
    }

    const canonicalLink = document.querySelector('link[rel="canonical"]');
    if (canonicalLink) {
      canonicalLink.setAttribute('href', `https://www.imagetopng.com${currentPath === '/' ? '/' : currentPath}`);
    }

    // Google Analytics 4: Client-side SPA route tracking (No PII or sensitive data transmitted)
    if (typeof window !== 'undefined' && typeof (window as unknown as { gtag?: Function }).gtag === 'function') {
      (window as unknown as { gtag: Function }).gtag('config', 'G-TNTXK0GCC7', {
        page_path: currentPath,
        page_title: document.title,
        page_location: window.location.href,
      });
    }
  }, [currentPath]);

  // Navigate handler that updates URL via history API
  const handleNavigate = (path: string) => {
    if (path.startsWith('/#')) {
      const hash = path.substring(2);
      if (currentPath !== '/') {
        window.history.pushState({}, '', '/');
        setCurrentPath('/');
      }
      setTimeout(() => {
        const el = document.getElementById(hash);
        el?.scrollIntoView({ behavior: 'smooth' });
      }, 50);
      return;
    }

    if (path !== currentPath) {
      window.history.pushState({}, '', path);
      setCurrentPath(path);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Route matching with Suspense for secondary routes
  const renderCurrentPage = () => {
    const cleanPath = currentPath.replace(/\/$/, '') || '/';

    if (cleanPath === '/' || cleanPath === '/image-to-png') {
      return <HomePage onNavigate={handleNavigate} />;
    }

    if (cleanPath === '/guides' || cleanPath === '/blog') {
      return <GuidesHubPage onNavigate={handleNavigate} />;
    }

    if (cleanPath.startsWith('/guides/') || cleanPath.startsWith('/blog/')) {
      const guideSlug = cleanPath.replace('/guides/', '').replace('/blog/', '');
      const guide = GUIDES_DATA.find((g) => g.slug === guideSlug);
      if (guide) {
        return <GuideDetailPage guide={guide} onNavigate={handleNavigate} />;
      }
      return <NotFoundPage onNavigate={handleNavigate} />;
    }

    if (cleanPath === '/about') {
      return <AboutPage onNavigate={handleNavigate} />;
    }

    if (cleanPath === '/security') {
      return <SecurityPage onNavigate={handleNavigate} />;
    }

    if (cleanPath === '/status') {
      return <StatusPage onNavigate={handleNavigate} />;
    }

    if (cleanPath === '/imprint') {
      return <ImprintPage onNavigate={handleNavigate} />;
    }

    if (cleanPath === '/contact') {
      return <ContactPage onNavigate={handleNavigate} />;
    }

    if (cleanPath === '/report-bug') {
      return <ReportBugPage onNavigate={handleNavigate} />;
    }

    if (cleanPath === '/privacy') {
      return <PrivacyPolicyPage onNavigate={handleNavigate} />;
    }

    if (cleanPath === '/terms') {
      return <TermsPage onNavigate={handleNavigate} />;
    }

    if (cleanPath === '/cookie-policy') {
      return <CookiePolicyPage onNavigate={handleNavigate} />;
    }

    const formatSlug = cleanPath.replace('/', '');
    const format = SUPPORTED_FORMATS.find((f) => f.slug === formatSlug);
    if (format) {
      return <FormatPage format={format} onNavigate={handleNavigate} />;
    }

    return <NotFoundPage onNavigate={handleNavigate} />;
  };

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 text-slate-900 selection:bg-blue-100 selection:text-blue-900 text-sm">
      <Header currentPath={currentPath} onNavigate={handleNavigate} />
      <main className="flex-1">{renderCurrentPage()}</main>
      <Footer onNavigate={handleNavigate} />
      <CookieBanner />
    </div>
  );
}
