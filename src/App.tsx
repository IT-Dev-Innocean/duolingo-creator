import * as Select from '@radix-ui/react-select';
import { AnimatePresence, motion } from 'motion/react';
import {
  ArrowRight,
  Check,
  ChevronDown,
  LockKeyhole,
  Sparkles,
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
import { ShimmerButton } from './components/magicui/shimmer-button';
import Dashboard from './pages/dashboard';
import './App.css';

type FormValues = {
  countryCode: string;
  phone: string;
};

const countries = [
  { code: '+62', flag: '🇮🇩', name: 'Indonesia' },
  { code: '+60', flag: '🇲🇾', name: 'Malaysia' },
  { code: '+65', flag: '🇸🇬', name: 'Singapore' },
  { code: '+63', flag: '🇵🇭', name: 'Philippines' },
];

function DuoMascot() {
  return (
    <motion.svg
      className='duo'
      viewBox='0 0 240 210'
      role='img'
      aria-label='Maskot burung hantu hijau melambaikan sayap'
      initial={{ rotate: -3, scale: 0.92 }}
      animate={{ rotate: [0, 2, 0], scale: 1 }}
      transition={{
        rotate: { duration: 2.4, repeat: Infinity, ease: 'easeInOut' },
        scale: { duration: 0.5 },
      }}>
      <motion.g
        animate={{ y: [0, -4, 0] }}
        transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}>
        <path
          d='M72 53C91 26 128 22 157 41c30-3 55 5 60 26 4 17-4 31-20 39v43c0 32-27 47-65 47H98c-39 0-65-16-65-49V91c0-31 14-44 39-38Z'
          fill='#58cc02'
        />
        <path
          d='M172 58c29-17 55-8 59 7 5 18-10 46-39 58l-20-65Z'
          fill='#58cc02'
        />
        <path
          d='M57 64c-16 1-29 15-28 34 1 16 11 30 26 36l17-73-15 3Z'
          fill='#58cc02'
        />
        <ellipse cx='105' cy='88' rx='37' ry='38' fill='#8ee000' />
        <ellipse cx='163' cy='88' rx='37' ry='38' fill='#8ee000' />
        <ellipse cx='105' cy='90' rx='25' ry='29' fill='#fff' />
        <ellipse cx='163' cy='90' rx='25' ry='29' fill='#fff' />
        <ellipse cx='111' cy='94' rx='11' ry='17' fill='#1f2430' />
        <ellipse cx='157' cy='94' rx='11' ry='17' fill='#1f2430' />
        <circle cx='115' cy='88' r='4' fill='#fff' />
        <circle cx='161' cy='88' r='4' fill='#fff' />
        <path
          d='M120 113c8-8 21-8 29 0-1 15-7 22-15 22s-13-7-14-22Z'
          fill='#ff9600'
        />
        <path d='M121 114h27c-4 7-21 7-27 0Z' fill='#ffb020' />
        <path
          d='M87 143c8 5 18 8 28 9M153 152c10-1 19-4 27-9'
          fill='none'
          stroke='#46ad00'
          strokeLinecap='round'
          strokeWidth='10'
        />
        <path
          d='M92 184c1-12 11-18 22-11l8 13c-8 9-25 8-30-2Z'
          fill='#ffb020'
        />
        <path
          d='M148 186l8-13c11-7 21-1 22 11-5 10-22 11-30 2Z'
          fill='#ffb020'
        />
      </motion.g>
      <g fill='#8ee000'>
        <path d='m25 50 5 10 10 5-10 5-5 10-5-10-10-5 10-5 5-10Z' />
        <path d='m218 133 4 8 8 4-8 4-4 8-4-8-8-4 8-4 4-8Z' />
        <path d='m205 22 3 6 6 3-6 3-3 6-3-6-6-3 6-3 3-6Z' />
      </g>
      <motion.path
        d='M176 17c5-8 17-5 17 4 7-6 17 1 13 9-4 8-16 12-16 12s-15-8-16-16c-1-4 0-7 2-9Z'
        fill='#58cc02'
        animate={{ scale: [1, 1.12, 1] }}
        style={{ transformOrigin: '190px 29px' }}
        transition={{ duration: 1.5, repeat: Infinity }}
      />
    </motion.svg>
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
                    <span className='eyebrow'>
                      <Sparkles size={13} />
                      Creator hub
                    </span>
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
                                <span>
                                  {
                                    countries.find(
                                      (country) => country.code === field.value
                                    )?.flag
                                  }{' '}
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
                                        <span>{country.flag}</span>
                                        <span>{country.code}</span>
                                        <small>{country.name}</small>
                                      </Select.ItemText>
                                      <Select.ItemIndicator>
                                        <Check size={15} />
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

                    <ShimmerButton type='submit' disabled={isLoading}>
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
                    </ShimmerButton>

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
