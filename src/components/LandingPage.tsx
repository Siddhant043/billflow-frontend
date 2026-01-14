import { Link } from '@tanstack/react-router'
import { motion } from 'framer-motion'
import {
    Zap,
    Check,
    ArrowRight,
    Globe,
    Shield,
    CreditCard,
    BarChart3,
    Bell,
    Users,
    Sparkles,
    Play,
    DollarSign,
    Clock,
    CheckCircle,
    AlertCircle,
    FileText,
    TrendingUp,
    ChevronRight
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import ThemeToggle from '@/components/ThemeToggle'

// Animation variants
const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] }
    }
}

const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.08, delayChildren: 0.1 }
    }
}

const scaleIn = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
        opacity: 1,
        scale: 1,
        transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] }
    }
}

// Smooth scroll helper
const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, sectionId: string) => {
    e.preventDefault()
    const element = document.getElementById(sectionId)
    if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
}

const features = [
    {
        icon: <Zap className="w-5 h-5" />,
        title: 'Lightning Fast Invoicing',
        desc: 'Create stunning, professional invoices in under 60 seconds with smart templates.'
    },
    {
        icon: <Bell className="w-5 h-5" />,
        title: 'Smart Reminders',
        desc: 'AI-powered follow-ups that adapt to client behavior and payment history.'
    },
    {
        icon: <CreditCard className="w-5 h-5" />,
        title: 'Instant Payments',
        desc: 'Accept cards, ACH, UPI, and crypto directly through your invoices.'
    },
    {
        icon: <Globe className="w-5 h-5" />,
        title: 'Global Ready',
        desc: 'Support for 135+ currencies with real-time exchange rate conversion.'
    },
    {
        icon: <BarChart3 className="w-5 h-5" />,
        title: 'Deep Analytics',
        desc: 'Visual dashboards for revenue trends, cash flow, and client insights.'
    },
    {
        icon: <Shield className="w-5 h-5" />,
        title: 'Bank-Grade Security',
        desc: 'Enterprise encryption with SOC 2 compliance for your peace of mind.'
    }
]

const pricingPlans = [
    {
        name: 'Starter',
        price: '$0',
        period: 'forever',
        description: 'Perfect for getting started',
        features: ['Up to 5 invoices/month', 'Basic reporting', '1 client portal', 'Email support'],
        cta: 'Start Free',
        popular: false
    },
    {
        name: 'Professional',
        price: '$19',
        period: '/month',
        description: 'For growing businesses',
        features: ['Unlimited invoices', 'Advanced analytics', 'Custom branding', 'Auto reminders', 'Priority support'],
        cta: 'Start Free Trial',
        popular: true
    },
    {
        name: 'Enterprise',
        price: '$49',
        period: '/month',
        description: 'For scaling teams',
        features: ['Everything in Pro', 'Team collaboration', 'White-label domain', 'API access', 'Dedicated manager'],
        cta: 'Contact Sales',
        popular: false
    }
]

const stats = [
    { value: '10K+', label: 'Active Users' },
    { value: '$2B+', label: 'Invoices Processed' },
    { value: '99.9%', label: 'Uptime SLA' },
    { value: '150+', label: 'Countries Served' }
]

// BillFlow Logo Component
function BillFlowLogo({ size = 'default' }: { size?: 'default' | 'large' }) {
    const iconSize = size === 'large' ? 28 : 24
    const boxSize = size === 'large' ? 'w-12 h-12' : 'w-10 h-10'
    const textSize = size === 'large' ? 'text-3xl' : 'text-2xl'

    return (
        <div className="flex items-center gap-3">
            <div className={`${boxSize} bg-primary rounded-xl flex items-center justify-center text-primary-foreground shadow-lg shadow-primary/20`}>
                <Zap size={iconSize} fill="currentColor" />
            </div>
            <span className={`${textSize} font-bold tracking-tight text-foreground`}>
                BillFlow
            </span>
        </div>
    )
}

// Dashboard Mockup Component - CSS-based preview of the actual app
function DashboardMockup() {
    const mockMetrics = [
        { label: 'Total Revenue', value: '₹12,450', icon: DollarSign, color: 'text-indigo-600 dark:text-indigo-400', bg: 'bg-indigo-50 dark:bg-indigo-950/50', trend: '+12.5%' },
        { label: 'Outstanding', value: '₹3,840', icon: Clock, color: 'text-amber-600 dark:text-amber-400', bg: 'bg-amber-50 dark:bg-amber-950/50', sub: '5 invoices' },
        { label: 'Paid This Month', value: '₹8,610', icon: CheckCircle, color: 'text-emerald-600 dark:text-emerald-400', bg: 'bg-emerald-50 dark:bg-emerald-950/50', trend: '+5.2%' },
        { label: 'Overdue', value: '₹1,200', icon: AlertCircle, color: 'text-red-600 dark:text-red-400', bg: 'bg-red-50 dark:bg-red-950/50', sub: '2 invoices' },
    ]

    const mockInvoices = [
        { client: 'Acme Corp', amount: '₹1,250', status: 'Paid', statusColor: 'text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/50' },
        { client: 'Tech Solutions', amount: '₹890', status: 'Pending', statusColor: 'text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/50' },
        { client: 'Design Studio', amount: '₹2,100', status: 'Overdue', statusColor: 'text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-950/50' },
    ]

    const chartBars = [45, 52, 48, 61, 55, 72]

    return (
        <div className="relative w-full max-w-5xl mx-auto">
            {/* Glow Effect */}
            <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 via-primary/10 to-primary/20 rounded-3xl blur-2xl opacity-60" />

            {/* Browser Window */}
            <Card className="relative overflow-hidden shadow-2xl border-border/50">
                {/* Browser Chrome */}
                <div className="flex items-center gap-2 px-4 py-3 border-b border-border bg-muted/50">
                    <div className="flex gap-1.5">
                        <div className="w-3 h-3 rounded-full bg-red-500" />
                        <div className="w-3 h-3 rounded-full bg-yellow-500" />
                        <div className="w-3 h-3 rounded-full bg-green-500" />
                    </div>
                    <div className="flex-1 flex justify-center">
                        <div className="flex items-center gap-2 px-4 py-1.5 bg-background rounded-md border border-border text-xs text-muted-foreground">
                            <Shield size={12} />
                            app.billflow.io/dashboard
                        </div>
                    </div>
                </div>

                {/* Dashboard Content */}
                <div className="flex">
                    {/* Sidebar */}
                    <div className="hidden md:flex w-16 border-r border-border bg-card flex-col items-center py-4 gap-4">
                        <div className="w-9 h-9 bg-primary rounded-lg flex items-center justify-center text-primary-foreground">
                            <Zap size={18} fill="currentColor" />
                        </div>
                        <div className="flex flex-col gap-3 mt-4">
                            <div className="w-9 h-9 bg-primary/10 rounded-lg flex items-center justify-center text-primary">
                                <BarChart3 size={16} />
                            </div>
                            <div className="w-9 h-9 hover:bg-muted rounded-lg flex items-center justify-center text-muted-foreground">
                                <FileText size={16} />
                            </div>
                            <div className="w-9 h-9 hover:bg-muted rounded-lg flex items-center justify-center text-muted-foreground">
                                <Users size={16} />
                            </div>
                            <div className="w-9 h-9 hover:bg-muted rounded-lg flex items-center justify-center text-muted-foreground">
                                <CreditCard size={16} />
                            </div>
                        </div>
                    </div>

                    {/* Main Content */}
                    <div className="flex-1 p-4 md:p-6 bg-background">
                        {/* Header */}
                        <div className="flex items-center justify-between mb-6">
                            <div>
                                <h3 className="text-sm md:text-base font-semibold text-foreground">Good Morning, John!</h3>
                                <p className="text-xs text-muted-foreground">Here's what's happening today.</p>
                            </div>
                            <Button size="sm" className="h-8 text-xs shadow-sm">
                                <Zap size={12} className="mr-1" />
                                New Invoice
                            </Button>
                        </div>

                        {/* Metrics Grid */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
                            {mockMetrics.map((metric, i) => (
                                <div key={i} className="p-3 rounded-xl border border-border bg-card">
                                    <div className="flex items-center gap-2 mb-2">
                                        <div className={`w-7 h-7 rounded-lg ${metric.bg} flex items-center justify-center`}>
                                            <metric.icon size={14} className={metric.color} />
                                        </div>
                                    </div>
                                    <p className="text-lg font-bold text-foreground">{metric.value}</p>
                                    <div className="flex items-center justify-between">
                                        <p className="text-[10px] text-muted-foreground">{metric.label}</p>
                                        {metric.trend && (
                                            <span className="text-[10px] text-emerald-600 dark:text-emerald-400 flex items-center">
                                                <TrendingUp size={10} className="mr-0.5" />
                                                {metric.trend}
                                            </span>
                                        )}
                                        {metric.sub && (
                                            <span className="text-[10px] text-muted-foreground">{metric.sub}</span>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Chart and Invoices Row */}
                        <div className="grid md:grid-cols-3 gap-4">
                            {/* Revenue Chart */}
                            <div className="md:col-span-2 p-4 rounded-xl border border-border bg-card">
                                <div className="flex items-center justify-between mb-4">
                                    <div>
                                        <p className="text-sm font-semibold text-foreground">Revenue Overview</p>
                                        <p className="text-[10px] text-muted-foreground">Last 6 months</p>
                                    </div>
                                    <Badge variant="outline" className="text-[10px]">Monthly</Badge>
                                </div>
                                {/* Simple Chart Visualization */}
                                <div className="flex items-end justify-between h-24 gap-2 px-2">
                                    {chartBars.map((height, i) => (
                                        <div key={i} className="flex-1 flex flex-col items-center gap-1">
                                            <div
                                                className="w-full bg-gradient-to-t from-primary/80 to-primary/40 rounded-t"
                                                style={{ height: `${height}%` }}
                                            />
                                            <span className="text-[8px] text-muted-foreground">
                                                {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'][i]}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Recent Invoices */}
                            <div className="p-4 rounded-xl border border-border bg-card">
                                <div className="flex items-center justify-between mb-3">
                                    <p className="text-sm font-semibold text-foreground">Recent Invoices</p>
                                    <ChevronRight size={14} className="text-muted-foreground" />
                                </div>
                                <div className="space-y-2">
                                    {mockInvoices.map((invoice, i) => (
                                        <div key={i} className="flex items-center justify-between p-2 rounded-lg hover:bg-muted/50">
                                            <div className="flex items-center gap-2">
                                                <div className={`w-7 h-7 rounded-full ${invoice.statusColor} flex items-center justify-center text-xs font-bold`}>
                                                    {invoice.client[0]}
                                                </div>
                                                <div>
                                                    <p className="text-xs font-medium text-foreground">{invoice.client}</p>
                                                    <p className="text-[10px] text-muted-foreground">{invoice.amount}</p>
                                                </div>
                                            </div>
                                            <Badge variant="outline" className={`text-[8px] ${invoice.statusColor} border-0`}>
                                                {invoice.status}
                                            </Badge>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Card>
        </div>
    )
}

function LandingPage() {
    return (
        <div className="min-h-screen bg-background text-foreground overflow-y-auto overflow-x-hidden">
            {/* Ambient Background */}
            <div className="fixed inset-0 pointer-events-none overflow-hidden">
                <div className="absolute -top-40 -left-40 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px]" />
                <div className="absolute top-1/3 -right-40 w-[500px] h-[500px] bg-primary/3 rounded-full blur-[100px]" />
                <div className="absolute -bottom-40 left-1/2 w-[700px] h-[400px] bg-primary/5 rounded-full blur-[120px]" />
            </div>

            {/* Navigation */}
            <motion.nav
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="sticky top-0 z-50 max-w-7xl mx-auto px-4 md:px-6 py-4"
            >
                <div className="flex items-center justify-between bg-card/90 backdrop-blur-xl border border-border rounded-2xl px-4 md:px-6 py-3 shadow-sm">
                    <Link to="/">
                        <BillFlowLogo />
                    </Link>

                    <div className="hidden md:flex items-center gap-8">
                        <a
                            href="#features"
                            onClick={(e) => scrollToSection(e, 'features')}
                            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
                        >
                            Features
                        </a>
                        <a
                            href="#pricing"
                            onClick={(e) => scrollToSection(e, 'pricing')}
                            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
                        >
                            Pricing
                        </a>
                        <a
                            href="#testimonials"
                            onClick={(e) => scrollToSection(e, 'testimonials')}
                            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
                        >
                            Testimonials
                        </a>
                    </div>

                    <div className="flex items-center gap-2 md:gap-3">
                        <ThemeToggle />
                        <Button variant="ghost" className="hidden sm:inline-flex text-muted-foreground hover:text-foreground" asChild>
                            <Link to="/auth">Log in</Link>
                        </Button>
                        <Button className="shadow-lg shadow-primary/20" asChild>
                            <Link to="/auth">Get Started</Link>
                        </Button>
                    </div>
                </div>
            </motion.nav>

            {/* Hero Section */}
            <section className="relative z-10 max-w-7xl mx-auto px-4 md:px-6 pt-12 md:pt-20 pb-20 md:pb-32">
                <div className="text-center">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.4 }}
                    >
                        <Badge
                            variant="outline"
                            className="mb-6 md:mb-8 py-2 px-4 border-primary/30 bg-primary/5 text-primary"
                        >
                            <span className="relative flex h-2 w-2 mr-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary/60 opacity-75" />
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
                            </span>
                            <span className="flex items-center gap-1.5 text-xs md:text-sm">
                                <Sparkles size={14} />
                                Trusted by 10,000+ businesses worldwide
                            </span>
                        </Badge>
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight mb-6 md:mb-8 leading-[1.1]"
                    >
                        <span className="block text-foreground">Invoice Smarter.</span>
                        <span className="block text-primary">Get Paid Faster.</span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="max-w-2xl mx-auto text-base md:text-lg text-muted-foreground mb-8 md:mb-10 leading-relaxed px-4"
                    >
                        The next-generation platform for modern businesses to create stunning invoices,
                        automate payments, and scale without the paperwork nightmare.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                        className="flex flex-col sm:flex-row items-center justify-center gap-3 md:gap-4"
                    >
                        <Button
                            size="lg"
                            className="h-12 md:h-14 px-6 md:px-8 text-base md:text-lg shadow-xl shadow-primary/25 w-full sm:w-auto"
                            asChild
                        >
                            <Link to="/auth">
                                Start Free Trial
                                <ArrowRight size={18} className="ml-2" />
                            </Link>
                        </Button>
                        <Button
                            size="lg"
                            variant="outline"
                            className="h-12 md:h-14 px-6 md:px-8 text-base md:text-lg w-full sm:w-auto"
                        >
                            <Play size={16} className="mr-2" />
                            Watch Demo
                        </Button>
                    </motion.div>

                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.4, delay: 0.5 }}
                        className="mt-5 text-xs md:text-sm text-muted-foreground"
                    >
                        No credit card required • 14-day free trial • Cancel anytime
                    </motion.p>
                </div>

                {/* Dashboard Preview - CSS-based mockup */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="mt-12 md:mt-20"
                >
                    <DashboardMockup />
                </motion.div>
            </section>

            {/* Stats Section */}
            <section className="relative z-10 py-12 md:py-16 border-y border-border bg-muted/30">
                <div className="max-w-7xl mx-auto px-4 md:px-6">
                    <motion.div
                        variants={staggerContainer}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-50px" }}
                        className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8"
                    >
                        {stats.map((stat, i) => (
                            <motion.div
                                key={i}
                                variants={fadeInUp}
                                className="text-center"
                            >
                                <div className="text-3xl md:text-5xl font-bold text-foreground mb-1 md:mb-2">
                                    {stat.value}
                                </div>
                                <div className="text-xs md:text-sm text-muted-foreground">{stat.label}</div>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* Features Section */}
            <section id="features" className="relative z-10 py-20 md:py-32">
                <div className="max-w-7xl mx-auto px-4 md:px-6">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-50px" }}
                        variants={fadeInUp}
                        className="text-center mb-12 md:mb-20"
                    >
                        <Badge variant="outline" className="mb-4 md:mb-6 border-primary/30 bg-primary/5 text-primary">
                            Powerful Features
                        </Badge>
                        <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4 md:mb-6">
                            Everything you need to{' '}
                            <span className="text-primary">scale</span>
                        </h2>
                        <p className="max-w-2xl mx-auto text-base md:text-lg text-muted-foreground px-4">
                            Focus on growing your business while we handle the financial operations with intelligent automation.
                        </p>
                    </motion.div>

                    <motion.div
                        variants={staggerContainer}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-50px" }}
                        className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6"
                    >
                        {features.map((feature, i) => (
                            <motion.div key={i} variants={scaleIn}>
                                <Card className="group relative h-full p-6 md:p-8 hover:shadow-lg hover:shadow-primary/5 hover:border-primary/20 transition-all duration-300">
                                    <div className="inline-flex p-3 rounded-xl bg-primary/10 text-primary mb-4 md:mb-6 group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
                                        {feature.icon}
                                    </div>
                                    <h3 className="text-lg md:text-xl font-semibold text-foreground mb-2 md:mb-3 group-hover:text-primary transition-colors">
                                        {feature.title}
                                    </h3>
                                    <p className="text-sm md:text-base text-muted-foreground leading-relaxed">{feature.desc}</p>
                                </Card>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* Pricing Section */}
            <section id="pricing" className="relative z-10 py-20 md:py-32 bg-muted/20">
                <div className="max-w-7xl mx-auto px-4 md:px-6">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-50px" }}
                        variants={fadeInUp}
                        className="text-center mb-12 md:mb-20"
                    >
                        <Badge variant="outline" className="mb-4 md:mb-6 border-primary/30 bg-primary/5 text-primary">
                            Simple Pricing
                        </Badge>
                        <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4 md:mb-6">
                            Plans that grow{' '}
                            <span className="text-primary">with you</span>
                        </h2>
                        <p className="max-w-2xl mx-auto text-base md:text-lg text-muted-foreground px-4">
                            Start free and scale as your business grows. No hidden fees, no surprises.
                        </p>
                    </motion.div>

                    <motion.div
                        variants={staggerContainer}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-50px" }}
                        className="grid md:grid-cols-3 gap-6 md:gap-8 items-start"
                    >
                        {pricingPlans.map((plan, i) => (
                            <motion.div
                                key={i}
                                variants={scaleIn}
                                className={plan.popular ? 'relative pt-2' : ''}
                                whileHover={{
                                    y: -8,
                                    transition: { duration: 0.3, ease: 'easeOut' }
                                }}
                                whileTap={{ scale: 0.98 }}
                            >
                                {plan.popular && (
                                    <div className="absolute -top-2 left-1/2 -translate-x-1/2 z-10">
                                        <Badge className="bg-primary text-primary-foreground shadow-lg">
                                            Most Popular
                                        </Badge>
                                    </div>
                                )}
                                <motion.div
                                    whileHover={{
                                        boxShadow: plan.popular
                                            ? '0 25px 50px -12px rgba(var(--primary), 0.25)'
                                            : '0 25px 50px -12px rgba(0, 0, 0, 0.15)'
                                    }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <Card className={`p-6 md:p-8 transition-colors duration-300 hover:border-primary/40 ${plan.popular ? 'border-primary shadow-xl shadow-primary/10 ring-1 ring-primary/20' : ''}`}>
                                        <h3 className="text-lg md:text-xl font-semibold text-foreground mb-2">{plan.name}</h3>
                                        <p className="text-sm text-muted-foreground mb-4 md:mb-6">{plan.description}</p>
                                        <div className="mb-6 md:mb-8">
                                            <span className="text-4xl md:text-5xl font-bold text-foreground">{plan.price}</span>
                                            <span className="text-muted-foreground ml-1">{plan.period}</span>
                                        </div>
                                        <ul className="space-y-3 md:space-y-4 mb-6 md:mb-8">
                                            {plan.features.map((feature, j) => (
                                                <motion.li
                                                    key={j}
                                                    className="flex items-center gap-3 text-sm text-muted-foreground"
                                                    whileHover={{ x: 4 }}
                                                    transition={{ duration: 0.2 }}
                                                >
                                                    <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                                                        <Check size={12} className="text-primary" />
                                                    </div>
                                                    {feature}
                                                </motion.li>
                                            ))}
                                        </ul>
                                        <Button
                                            className={`w-full h-11 md:h-12 ${plan.popular ? 'shadow-lg shadow-primary/20' : ''}`}
                                            variant={plan.popular ? 'default' : 'outline'}
                                            asChild
                                        >
                                            <Link to="/auth">{plan.cta}</Link>
                                        </Button>
                                    </Card>
                                </motion.div>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="relative z-10 py-20 md:py-32">
                <div className="max-w-4xl mx-auto px-4 md:px-6">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-50px" }}
                        variants={scaleIn}
                    >
                        <Card className="relative overflow-hidden p-8 md:p-16 text-center border-primary/20 bg-primary/5">
                            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent" />
                            <div className="relative z-10">
                                <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4 md:mb-6">
                                    Ready to transform your billing?
                                </h2>
                                <p className="text-base md:text-lg text-muted-foreground mb-8 md:mb-10 max-w-xl mx-auto">
                                    Join thousands of businesses that have already streamlined their invoicing with BillFlow.
                                </p>
                                <div className="flex flex-col sm:flex-row items-center justify-center gap-3 md:gap-4">
                                    <Button
                                        size="lg"
                                        className="h-12 md:h-14 px-8 md:px-10 text-base md:text-lg shadow-xl shadow-primary/25 w-full sm:w-auto"
                                        asChild
                                    >
                                        <Link to="/auth">
                                            Get Started Free
                                            <ArrowRight size={18} className="ml-2" />
                                        </Link>
                                    </Button>
                                    <Button
                                        size="lg"
                                        variant="outline"
                                        className="h-12 md:h-14 px-8 md:px-10 text-base md:text-lg w-full sm:w-auto"
                                    >
                                        Talk to Sales
                                    </Button>
                                </div>
                            </div>
                        </Card>
                    </motion.div>
                </div>
            </section>

            {/* Footer */}
            <footer className="relative z-10 border-t border-border bg-card/50">
                <div className="max-w-7xl mx-auto px-4 md:px-6 py-12 md:py-16">
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-8 md:gap-12 mb-12 md:mb-16">
                        <div className="col-span-2">
                            <BillFlowLogo />
                            <p className="text-muted-foreground leading-relaxed max-w-xs mt-4 md:mt-6 mb-4 md:mb-6 text-sm">
                                Making financial management effortless for modern businesses since 2026.
                            </p>
                            <div className="flex items-center gap-3">
                                {[Globe, Shield, Users].map((Icon, i) => (
                                    <div
                                        key={i}
                                        className="w-9 h-9 md:w-10 md:h-10 rounded-lg bg-muted border border-border flex items-center justify-center hover:bg-primary/10 hover:border-primary/20 hover:text-primary transition-colors cursor-pointer"
                                    >
                                        <Icon size={16} />
                                    </div>
                                ))}
                            </div>
                        </div>
                        {[
                            { title: 'Product', links: ['Features', 'Pricing', 'Templates', 'Security', 'API'] },
                            { title: 'Company', links: ['About', 'Blog', 'Careers', 'Press', 'Partners'] },
                            { title: 'Legal', links: ['Privacy', 'Terms', 'Cookies', 'GDPR'] }
                        ].map((section, i) => (
                            <div key={i}>
                                <h4 className="font-semibold text-foreground mb-4 md:mb-6 text-sm md:text-base">{section.title}</h4>
                                <ul className="space-y-2 md:space-y-4">
                                    {section.links.map((link, j) => (
                                        <li key={j}>
                                            <a href="#" className="text-xs md:text-sm text-muted-foreground hover:text-foreground transition-colors">
                                                {link}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>

                    <Separator className="mb-6 md:mb-8" />

                    <div className="flex flex-col md:flex-row items-center justify-between gap-4 md:gap-6">
                        <p className="text-xs md:text-sm text-muted-foreground">© 2026 BillFlow Inc. All rights reserved.</p>
                        <div className="flex items-center gap-4 md:gap-6 text-xs md:text-sm text-muted-foreground">
                            <a href="#" className="hover:text-foreground transition-colors">Privacy Policy</a>
                            <a href="#" className="hover:text-foreground transition-colors">Terms of Service</a>
                            <a href="#" className="hover:text-foreground transition-colors">Cookie Settings</a>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    )
}

export default LandingPage