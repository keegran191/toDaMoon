import { motion, AnimatePresence } from 'framer-motion';

function UniversalModal({
    children, // the html children

    message,
    txtApply,
    onApply,
    txtClose,
    onClose
}) {

    return (
        <div className="fixed top-0 left-0 w-full h-full flex p-4 items-center justify-center z-50 sm:top-1/2 sm:left-1/2 sm:transform sm:-translate-x-1/2 sm:-translate-y-1/2">
            <div className="relative w-full shadow-2xl rounded-lg max-w-md md:h-auto">
                <div className="relative bg-[#FFFFFF] rounded-lg shadow">
                    <motion.button
                        whileHover={{ 
                            scale: 1.05,
                            backgroundColor: '#252525',
                            color: 'white'
                        }}
                        whileTap={{ scale: 1.00 }}
                        onClick={() => {
                            if(onClose) onClose();
                        }}
                        type="button" 
                        className="absolute top-3 right-2.5 text-gray-600 text-sm px-2 py-0.5 rounded-lg">
                        <span className="text-xl bold">✕</span>
                    </motion.button>
                    
                    <div className="p-6 text-center">
                        <svg aria-hidden="true" className="mx-auto mb-4 text-[#FFC107] w-14 h-14" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                        <h4 className="mb-5 text-lg font-normal text-[#252525]">{message}</h4>
                        { children }
                        <motion.button 
                            className="text-white bg-[#D71E1E] font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2"
                            whileHover={{ 
                                scale: 1.05,
                                backgroundColor: '#D40000',
                                color: 'white'
                            }}
                            whileTap={{ scale: 1.00 }}
                            onClick={() => {
                                if(onApply) onApply();
                            }} 
                            data-modal-hide="popup-modal" 
                            type="button" 
                        >
                            { txtApply }
                        </motion.button>
                        <motion.button
                            className="text-gray-500 bg-white hover:bg-gray-100  rounded-lg text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-500"
                            whileHover={{ 
                                scale: 1.05,
                                backgroundColor: '#252525',
                                color: 'white'
                            }}
                            whileTap={{ scale: 1.00 }}
                            onClick={() => {
                                if(onClose) onClose();
                            }} 
                            data-modal-hide="popup-modal" 
                            type="button" 
                        >
                            {txtClose}
                        </motion.button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UniversalModal;