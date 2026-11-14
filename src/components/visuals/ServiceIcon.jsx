import { ShieldCheck, Truck, Monitor, Headset } from 'lucide-react';
const icons = {
  'security-dispatching': ShieldCheck,
  'truck-dispatching': Truck,
  'remote-it-support': Monitor,
  'call-center-customer-care': Headset,
};
export default function ServiceIcon({ serviceId, ...props }) {
  const Icon = icons[serviceId];
  return <Icon {...props} />;
}
