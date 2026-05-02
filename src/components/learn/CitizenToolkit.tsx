import { motion } from 'framer-motion';
import { Calendar, MapPin, ExternalLink, ShieldCheck } from 'lucide-react';
import { getElectionReminderLink, getBoothFinderMapUrl } from '../../utils/googleServices';

export default function CitizenToolkit() {
  const reminderLink = getElectionReminderLink();
  const mapUrl = getBoothFinderMapUrl();

  return (
    <section className="mb-24 px-4 md:px-0" aria-label="Citizen Toolkit">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="flex items-center gap-4 mb-10"
      >
        <div className="w-12 h-1 bg-emerald-500 rounded-full" />
        <h2 className="font-display text-3xl md:text-4xl font-bold tracking-tight text-slate-900">
          Citizen Toolkit
        </h2>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Calendar Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="group glass p-8 rounded-[2rem] border border-slate-200/50 hover:border-blue-200 transition-all duration-500"
        >
          <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
            <Calendar className="w-8 h-8 text-blue-600" />
          </div>
          <h3 className="text-2xl font-bold text-slate-900 mb-3">Election Reminder</h3>
          <p className="text-slate-500 mb-8 leading-relaxed">
            Never miss your chance to vote. Add the 2029 General Election to your Google Calendar in one click.
          </p>
          <a
            href={reminderLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-slate-900 text-white px-6 py-3 rounded-xl font-bold text-sm hover:bg-blue-600 transition-colors"
          >
            Add to Google Calendar
            <ExternalLink className="w-4 h-4" />
          </a>
        </motion.div>

        {/* Maps Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="group glass p-8 rounded-[2rem] border border-slate-200/50 hover:border-emerald-200 transition-all duration-500"
        >
          <div className="w-16 h-16 bg-emerald-50 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
            <MapPin className="w-8 h-8 text-emerald-600" />
          </div>
          <h3 className="text-2xl font-bold text-slate-900 mb-3">Booth Finder</h3>
          <p className="text-slate-500 mb-8 leading-relaxed">
            Locate your nearest polling booth or ECI office using Google Maps.
          </p>
          <div className="rounded-2xl overflow-hidden border border-slate-100 h-48 mb-6">
            <iframe
              title="Google Maps Booth Finder"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              loading="lazy"
              allowFullScreen
              src={mapUrl}
            />
          </div>
          <p className="text-[10px] text-slate-400 font-medium">
            Powered by Google Maps Platform
          </p>
        </motion.div>
      </div>

      {/* Security/Trust Badge */}
      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        className="mt-12 flex items-center justify-center gap-3 text-slate-400"
      >
        <ShieldCheck className="w-5 h-5 text-emerald-500" />
        <span className="text-xs font-bold uppercase tracking-widest">Official ECI Data Integration</span>
      </motion.div>
    </section>
  );
}
