import NavAdmin from '../components/NavbarAdmin.js'
import axios from 'axios';
import { useState, useEffect } from 'react';
import Head from 'next/head'
import style from '../styles/Admin.module.css'

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
            <div className="relative w-full shadow-lg rounded-lg max-w-md md:h-auto">
                <div className="relative bg-[#252525] rounded-lg shadow">
                    <button onClick={() => {
                            if(onClose) onClose();
                        }}
                        type="button" className="absolute top-3 right-2.5 text-white bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center" data-modal-hide="popup-modal"
                    >
                        <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                    </button>
                    <div className="p-6 text-center">
                        <svg aria-hidden="true" className="mx-auto mb-4 text-gray-400 w-14 h-14 dark:text-gray-200" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                        <h4 className="mb-5 text-lg font-normal text-white">{message}</h4>
                        { children }
                        <button onClick={() => {
                            if(onApply) onApply();
                        }} data-modal-hide="popup-modal" type="button" className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2">
                            { txtApply }
                        </button>
                        <button onClick={() => {
                            if(onClose) onClose();
                        }} data-modal-hide="popup-modal" type="button" className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600">{txtClose}</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UniversalModal;