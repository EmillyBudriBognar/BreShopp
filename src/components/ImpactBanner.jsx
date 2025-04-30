import { motion } from 'framer-motion';

const ImpactBanner = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}  
      transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
      className="bg-[#7f5e1030] bg-opacity-20 text-custom-green py-4"
    >
      <div className="container mx-auto px-4 text-center">
        <p className="font-medium">
          <span className="text-custom-pink font-bold">+3.200 roupas</span> já ganharam um novo ciclo através da nossa plataforma 🌱
        </p>
      </div>
    </motion.div>
  )
}

export default ImpactBanner;