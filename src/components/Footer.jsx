import React from 'react';
import { Twitter, Instagram, Mail, Phone, MapPin, GithubIcon, LinkedinIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

const Footer = () => {
  return (
    <footer className="bottom-0 w-full bg-black text-white mt-auto">
      <div className="container mx-auto py-8 px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Contact Us</h3>
            <div className="flex items-center space-x-2">
              <Phone className="h-5 w-5" />
              <span>+91 7848949399</span>
            </div>
            <div className="flex items-center space-x-2">
              <Mail className="h-5 w-5" />
              <a href="mailto:info@localservicefinder.com" className="hover:underline">
                info@localservicefinder.com
              </a>
            </div>
          </div>
          
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Address</h3>
            <div className="flex items-start space-x-2">
              <MapPin className="h-5 w-5 mt-1 flex-shrink-0" />
              <span>
                123 Service Street
                <br />
                Cityville, State 12345
                <br />
                United States
              </span>
            </div>
          </div>
          
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Follow Us</h3>
            <div className="flex space-x-4">
              <Button variant="ghost" size="icon" asChild>
                <a href="https://github.com/hsmaharaj1" target="_blank" rel="noopener noreferrer">
                  <GithubIcon className="h-5 w-5" />
                  <span className="sr-only">Github</span>
                </a>
              </Button>
              <Button variant="ghost" size="icon" asChild>
                <a href="https://www.linkedin.com/in/hsmaharaj1/" target="_blank" rel="noopener noreferrer">
                  <LinkedinIcon className="h-5 w-5" />
                  <span className="sr-only">LinkedIn</span>
                </a>
              </Button>
              <Button variant="ghost" size="icon" asChild>
                <a href="https://x.com/himssekhar" target="_blank" rel="noopener noreferrer">
                  <Twitter className="h-5 w-5" />
                  <span className="sr-only">Twitter</span>
                </a>
              </Button>
              <Button variant="ghost" size="icon" asChild>
                <a href="https://instagram.com/hsmaharaj1" target="_blank" rel="noopener noreferrer">
                  <Instagram className="h-5 w-5" />
                  <span className="sr-only">Instagram</span>
                </a>
              </Button>
            </div>
          </div>
        </div>
        
        <Separator className="my-2 bg-primary-foreground/20" />
        
        <div className="text-center text-sm">
          <p className='mb-2'>Developed by H I M A N S H U</p>
          <p>&copy; 2024 Local Service Finder. All rights reserved.</p>
          <div className="mt-2 space-x-4">
            <a href="/privacy-policy" className="hover:underline">Privacy Policy</a>
            <a href="/terms-of-service" className="hover:underline">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
