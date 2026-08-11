import * as Select from '@radix-ui/react-select';
import { AnimatePresence, motion } from 'motion/react';
import {
  ArrowRight,
  Check,
  ChevronDown,
  LockKeyhole,
} from 'lucide-react';
import { Controller, useForm } from 'react-hook-form';
import {
  Navigate,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from 'react-router-dom';
import { useState } from 'react';
import { BlurFade } from './components/magicui/blur-fade';
import Dashboard from './pages/dashboard';
import './App.css';
import duoImg from './assets/duo-loginscreen.png';
import Rewards from './pages/rewards';
import Faqs from './pages/faqs';

type FormValues = {
  countryCode: string;
  phone: string;
};

const countries = [
  { code: '+62', iso: 'id', name: 'Indonesia' },
  { code: '+60', iso: 'my', name: 'Malaysia' },
  { code: '+65', iso: 'sg', name: 'Singapore' },
  { code: '+63', iso: 'ph', name: 'Philippines' },
];

function DuoMascot() {
  return (
    <motion.img
      src={duoImg}
      alt='Maskot Duolingo'
      className='duo'
      initial={{ rotate: -3, scale: 0.92, y: 0 }}
      animate={{ 
        rotate: [-1, 2, -1], 
        scale: 1, 
        y: [0, -8, 0] 
      }}
      transition={{
        rotate: { duration: 3, repeat: Infinity, ease: 'easeInOut' },
        y: { duration: 3, repeat: Infinity, ease: 'easeInOut' },
        scale: { duration: 0.5 },
      }}
      style={{ width: '100%', maxWidth: '240px', objectFit: 'contain', display: 'block', margin: '0 auto' }}
    />
  );
}

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: { countryCode: '+62', phone: '' },
  });

  const submitPhone = () => {
    setIsLoading(true);
    window.setTimeout(() => {
      setIsLoading(false);
      navigate('/dashboard');
    }, 700);
  };

  return (
    <main className='app-shell'>
      <header className='brand'>
        <span className='brand__duolingo'>duolingo</span>
        <span className='brand__creators'>creators</span>
      </header>

      <AnimatePresence mode='wait'>
        <Routes location={location} key={location.pathname}>
          <Route
            path='/'
            element={
              <motion.section
                key='login'
                className='login-screen'
                initial={{ opacity: 0, x: -24 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -24 }}
                transition={{ duration: 0.25 }}>
                <BlurFade className='welcome' delay={0.05}>
                  <div className='welcome__copy'>
                    <h1>Welcome, Creator!</h1>
                    <p>
                      Enter your phone number to access the Creator Leaderboard
                      and see your progress.
                    </p>
                  </div>
                  <div className='mascot-wrap'>
                    <DuoMascot />
                  </div>
                </BlurFade>

                <BlurFade delay={0.18}>
                  <form
                    className='phone-card'
                    onSubmit={handleSubmit(submitPhone)}
                    noValidate>
                    <label htmlFor='phone'>Phone Number</label>
                    <div
                      className={`phone-field ${errors.phone ? 'phone-field--error' : ''}`}>
                      <Controller
                        name='countryCode'
                        control={control}
                        render={({ field }) => (
                          <Select.Root
                            value={field.value}
                            onValueChange={field.onChange}>
                            <Select.Trigger
                              className='country-trigger'
                              aria-label='Pilih negara'>
                              <Select.Value>
                                <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                  <img
                                    src={`https://flagcdn.com/w20/${countries.find((c) => c.code === field.value)?.iso}.png`}
                                    alt="flag"
                                    style={{ width: '24px', borderRadius: '2px', display: 'block' }}
                                  />
                                  {field.value}
                                </span>
                              </Select.Value>
                              <Select.Icon>
                                <ChevronDown size={17} strokeWidth={2.5} />
                              </Select.Icon>
                            </Select.Trigger>
                            <Select.Portal>
                              <Select.Content
                                className='country-menu'
                                position='popper'
                                sideOffset={8}>
                                <Select.Viewport>
                                  {countries.map((country) => (
                                    <Select.Item
                                      className='country-option'
                                      key={country.code}
                                      value={country.code}>
                                      <Select.ItemText>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                          <img
                                            src={`https://flagcdn.com/w20/${country.iso}.png`}
                                            alt={country.name}
                                            style={{ width: '20px', borderRadius: '2px' }}
                                          />
                                          <span>{country.code}</span>
                                          <small style={{ color: '#8a93a2', fontSize: '12px' }}>
                                            {country.name}
                                          </small>
                                        </div>
                                      </Select.ItemText>
                                      <Select.ItemIndicator style={{ marginLeft: 'auto' }}>
                                        <Check size={15} color="#58cc02" />
                                      </Select.ItemIndicator>
                                    </Select.Item>
                                  ))}
                                </Select.Viewport>
                              </Select.Content>
                            </Select.Portal>
                          </Select.Root>
                        )}
                      />
                      <span className='field-divider' aria-hidden='true' />
                      <input
                        id='phone'
                        inputMode='numeric'
                        autoComplete='tel-national'
                        placeholder='812-3456-7890'
                        aria-invalid={Boolean(errors.phone)}
                        {...register('phone', {
                          required: 'Masukkan nomor telepon kamu.',
                          minLength: {
                            value: 8,
                            message: 'Nomor telepon minimal 8 digit.',
                          },
                          pattern: {
                            value: /^[0-9 -]+$/,
                            message: 'Gunakan angka saja.',
                          },
                        })}
                      />
                    </div>
                    <div className='field-message' role='alert'>
                      {errors.phone?.message ?? '\u00A0'}
                    </div>

                    <button className='submit-btn' type='submit' disabled={isLoading}>
                      {isLoading ? (
                        <span className='loading-dots' aria-label='Memuat'>
                          <i />
                          <i />
                          <i />
                        </span>
                      ) : (
                        <>
                          Let&apos;s Go!
                          <ArrowRight size={22} strokeWidth={2.8} />
                        </>
                      )}
                    </button>

                    <p className='privacy'>
                      <LockKeyhole size={16} fill='currentColor' />
                      We&apos;ll never share your number with anyone.
                    </p>
                  </form>
                </BlurFade>
              </motion.section>
            }
          />

          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/rewards' element={<Rewards />} />
          <Route path='/faqs' element={<Faqs />} />
          
          <Route path='*' element={<Navigate to='/' replace />} />
        </Routes>
      </AnimatePresence>

      <div className='landscape' aria-hidden='true'>
        <span className='hill hill--back' />
        <span className='hill hill--front' />
        <i className='tree tree--left' />
        <i className='tree tree--small' />
        <i className='tree tree--right' />
      </div>
    </main>
  );
}

export default App;