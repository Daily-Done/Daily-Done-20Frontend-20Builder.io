import React from 'react';
import { Link } from 'react-router-dom';

interface FooterProps {
  variant?: 'default' | 'admin' | 'helper';
}

const Footer: React.FC<FooterProps> = ({ variant = 'default' }) => {
  const getFooterContent = () => {
    switch (variant) {
      case 'admin':
        return {
          title: 'Admin Portal',
          sections: [
            {
              title: 'Admin Tools',
              links: [
                { label: 'User Management', href: '#' },
                { label: 'Helper Verification', href: '#' },
                { label: 'Task Monitoring', href: '#' },
                { label: 'Payment Oversight', href: '#' },
                { label: 'Analytics Dashboard', href: '#' }
              ]
            },
            {
              title: 'Platform',
              links: [
                { label: 'Public Site', href: '/', isRoute: true },
                { label: 'API Documentation', href: '#' },
                { label: 'System Status', href: '#' },
                { label: 'Security Center', href: '#' }
              ]
            },
            {
              title: 'Support',
              links: [
                { label: 'Admin Help Center', href: '#' },
                { label: 'Contact Support', href: '#' },
                { label: 'Report Issue', href: '#' },
                { label: 'Emergency Contacts', href: '#' }
              ]
            },
            {
              title: 'Legal',
              links: [
                { label: 'Admin Policies', href: '#' },
                { label: 'Privacy Policy', href: '#' },
                { label: 'Terms of Service', href: '#' },
                { label: 'Compliance', href: '#' }
              ]
            }
          ],
          copyright: '© 2025 DailyDone Technologies Inc. All rights reserved. | Admin Portal v2.0'
        };

      case 'helper':
        return {
          title: 'Helper Platform',
          sections: [
            {
              title: 'For Helpers',
              links: [
                { label: 'How to Help', href: '#' },
                { label: 'Helper Guidelines', href: '#' },
                { label: 'Safety Tips', href: '#' },
                { label: 'Earnings Guide', href: '#' },
                { label: 'Community Standards', href: '#' }
              ]
            },
            {
              title: 'Platform',
              links: [
                { label: 'For Customers', href: '/', isRoute: true },
                { label: 'Become a Helper', href: '/helper-signup', isRoute: true },
                { label: 'DailyDone Business', href: '#' },
                { label: 'Gift Cards', href: '#' }
              ]
            },
            {
              title: 'Support',
              links: [
                { label: 'Help Center', href: '#' },
                { label: 'Contact Support', href: '#' },
                { label: 'Safety Center', href: '#' },
                { label: 'Community Guidelines', href: '#' }
              ]
            },
            {
              title: 'Account',
              links: [
                { label: 'My Profile', href: '/profile', isRoute: true },
                { label: 'Payment Settings', href: '#' },
                { label: 'Notification Settings', href: '#' },
                { label: 'Privacy Settings', href: '#' }
              ]
            }
          ],
          copyright: '© 2025 DailyDone Technologies Inc. Empowering communities, one task at a time.'
        };

      default:
        return {
          title: 'DailyDone',
          sections: [
            {
              title: 'Company',
              links: [
                { label: 'About DailyDone', href: '#' },
                { label: 'How it works', href: '#' },
                { label: 'Careers', href: '#' },
                { label: 'Press', href: '#' },
                { label: 'Blog', href: '#' }
              ]
            },
            {
              title: 'Products',
              links: [
                { label: 'For customers', href: '/', isRoute: true },
                { label: 'For helpers', href: '/helper-signup', isRoute: true },
                { label: 'DailyDone Business', href: '#' },
                { label: 'Gift cards', href: '#' }
              ]
            },
            {
              title: 'Support',
              links: [
                { label: 'Help Center', href: '#' },
                { label: 'Safety', href: '#' },
                { label: 'Contact us', href: '#' },
                { label: 'Trust & Safety', href: '#' },
                { label: 'Community guidelines', href: '#' }
              ]
            },
            {
              title: 'Global',
              links: [
                { label: 'Cities', href: '#' },
                { label: 'Countries', href: '#' },
                { label: 'Accessibility', href: '#' },
                { label: 'Diversity', href: '#' }
              ]
            }
          ],
          copyright: '© 2025 DailyDone Technologies Inc. All rights reserved.'
        };
    }
  };

  const footerContent = getFooterContent();

  return (
    <footer className="bg-gray-900 text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {footerContent.sections.map((section, index) => (
            <div key={index}>
              <h3 className="text-lg font-bold text-blue-400 mb-6">{section.title}</h3>
              <div className="space-y-3">
                {section.links.map((link, linkIndex) => (
                  link.isRoute ? (
                    <Link 
                      key={linkIndex}
                      to={link.href} 
                      className="block text-gray-300 hover:text-white transition-colors"
                    >
                      {link.label}
                    </Link>
                  ) : (
                    <a 
                      key={linkIndex}
                      href={link.href} 
                      className="block text-gray-300 hover:text-white transition-colors"
                    >
                      {link.label}
                    </a>
                  )
                ))}
              </div>
            </div>
          ))}
        </div>
        
        <div className="border-t border-gray-700 pt-8 text-center text-gray-400">
          <p>{footerContent.copyright}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
