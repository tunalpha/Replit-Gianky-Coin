import Swal from 'sweetalert2';

export const showSuccessAlert = (title: string, message: string, transactionHash?: string, referralId?: string, gkyRewards?: string, tokenId?: string) => {
  // Close any existing alerts first
  Swal.close();
  
  console.log('showSuccessAlert called with:', { title, message, transactionHash, referralId, gkyRewards, tokenId });
  console.log('About to show success alert...');
  
  // Check if it's a mobile device
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  
  // Add a small delay to ensure any previous alerts are fully closed
  setTimeout(() => {
    console.log('Actually showing success alert now...');
    try {
      Swal.fire({
    title: title,
    text: message,
    icon: 'success',
    confirmButtonText: 'Great!',
    confirmButtonColor: '#10B981',
    background: '#1F2937',
    color: '#FFFFFF',
    width: isMobile ? '95%' : '90%',
    heightAuto: isMobile ? true : false,
    allowOutsideClick: isMobile ? true : false,
    allowEscapeKey: true,
    customClass: {
      popup: 'rounded-xl border border-gray-600',
      confirmButton: 'rounded-lg px-4 sm:px-6 py-2 sm:py-3 text-base sm:text-lg font-semibold w-full sm:w-auto',
      title: 'text-lg sm:text-xl md:text-2xl',
      htmlContainer: 'text-sm sm:text-base'
    },
    didOpen: () => {
      console.log('Success alert opened successfully!');
      
      // On mobile, add a timeout to ensure the alert is visible
      if (isMobile) {
        setTimeout(() => {
          const popup = document.querySelector('.swal2-popup') as HTMLElement;
          if (popup) {
            popup.style.zIndex = '999999';
            popup.style.position = 'fixed';
            popup.style.top = '50%';
            popup.style.left = '50%';
            popup.style.transform = 'translate(-50%, -50%)';
          }
        }, 50);
      }
    },
    html: transactionHash ? `
      <div class="text-center px-2 sm:px-4">
        <p class="mb-3 sm:mb-4 text-sm sm:text-base">${message}</p>
        <div class="bg-gray-800 rounded-lg p-3 sm:p-4 mb-3 sm:mb-4">
          <p class="text-xs sm:text-sm text-gray-400 mb-2">Transaction Hash:</p>
          <p class="text-green-400 font-mono text-xs break-all leading-relaxed">${transactionHash}</p>
        </div>
        ${tokenId ? `
        <div class="bg-gradient-to-r from-purple-800/50 to-pink-800/50 rounded-lg p-3 sm:p-4 mb-3 sm:mb-4 border border-purple-500/30">
          <p class="text-xs sm:text-sm text-gray-400 mb-2">Your New NFT Token ID:</p>
          <p class="text-purple-300 font-mono text-lg font-bold">#${tokenId}</p>
          <p class="text-xs text-gray-500 mt-1">This is your newly minted NFT token ID</p>
        </div>
        ` : ''}
        ${referralId ? `
        <div class="bg-gray-800 rounded-lg p-3 sm:p-4 mb-3 sm:mb-4">
          <p class="text-xs sm:text-sm text-gray-400 mb-2">Referral ID Used:</p>
          <p class="text-yellow-400 font-mono text-lg font-bold">${referralId}</p>
          <p class="text-xs text-gray-500 mt-1">The referral ID you used for this mint</p>
        </div>
        ` : ''}
        ${gkyRewards ? `
        <div class="bg-gradient-to-r from-green-800/50 to-emerald-800/50 rounded-lg p-3 sm:p-4 mb-3 sm:mb-4 border border-green-500/30">
          <p class="text-xs sm:text-sm text-gray-400 mb-2">🎉 GKY Rewards Received:</p>
          <p class="text-green-400 font-mono text-lg font-bold">${gkyRewards} GKY</p>
          <p class="text-xs text-gray-500 mt-1">Cashback rewards have been added to your wallet!</p>
        </div>
        ` : ''}
        <a href="https://polygonscan.com/tx/${transactionHash}" 
           target="_blank" 
           class="text-blue-400 hover:text-blue-300 underline text-sm sm:text-base block mt-3">
          View on PolygonScan
        </a>
      </div>
    ` : message
    });
    } catch (error) {
      console.error('Error showing success alert:', error);
      
      // Fallback to browser alert on mobile if SweetAlert2 fails
      if (isMobile) {
        console.log('Falling back to browser alert on mobile...');
        const alertMessage = `${title}\n\n${message}${transactionHash ? `\n\nTransaction: ${transactionHash}` : ''}${tokenId ? `\n\nToken ID: ${tokenId}` : ''}${referralId ? `\n\nReferral ID: ${referralId}` : ''}${gkyRewards ? `\n\nGKY Rewards: ${gkyRewards}` : ''}`;
        alert(alertMessage);
      }
    }
  }, isMobile ? 200 : 100); // Longer delay for mobile
};

export const showErrorAlert = (title: string, message: string) => {
  // Close any existing alerts first
  Swal.close();
  
  return Swal.fire({
    title: title,
    text: message,
    icon: 'error',
    confirmButtonText: 'Try Again',
    confirmButtonColor: '#EF4444',
    background: '#1F2937',
    color: '#FFFFFF',
    width: '90%',
    customClass: {
      popup: 'rounded-xl border border-gray-600',
      confirmButton: 'rounded-lg px-4 sm:px-6 py-2 sm:py-3 text-base sm:text-lg font-semibold w-full sm:w-auto',
      title: 'text-lg sm:text-xl md:text-2xl',
      htmlContainer: 'text-sm sm:text-base'
    }
  });
};

export const showConfirmAlert = (title: string, message: string, amount: string) => {
  return Swal.fire({
    title: title,
    text: message,
    icon: 'question',
    showCancelButton: true,
    confirmButtonText: 'Yes, Mint NFT!',
    cancelButtonText: 'Cancel',
    confirmButtonColor: '#10B981',
    cancelButtonColor: '#6B7280',
    background: '#1F2937',
    color: '#FFFFFF',
    width: '90%',
    customClass: {
      popup: 'rounded-xl border border-gray-600',
      confirmButton: 'rounded-lg px-4 sm:px-6 py-2 sm:py-3 text-base sm:text-lg font-semibold w-full sm:w-auto',
      cancelButton: 'rounded-lg px-4 sm:px-6 py-2 sm:py-3 text-base sm:text-lg font-semibold w-full sm:w-auto',
      title: 'text-lg sm:text-xl md:text-2xl',
      htmlContainer: 'text-sm sm:text-base'
    },
    html: `
      <div class="text-center px-2 sm:px-4">
        <p class="mb-3 sm:mb-4 text-sm sm:text-base">${message}</p>
        <div class="bg-gray-800 rounded-lg p-3 sm:p-4">
          <p class="text-xs sm:text-sm text-gray-400 mb-2">Payment Amount:</p>
          <p class="text-lg sm:text-xl md:text-2xl font-bold text-green-400">${amount} MATIC</p>
        </div>
      </div>
    `
  });
};

export const showLoadingAlert = (title: string, message: string) => {
  // Close any existing alerts first
  Swal.close();
  
  return Swal.fire({
    title: title,
    text: message,
    allowOutsideClick: false,
    allowEscapeKey: false,
    showConfirmButton: false,
    didOpen: () => {
      Swal.showLoading();
    },
    background: '#1F2937',
    color: '#FFFFFF',
    width: '90%',
    customClass: {
      popup: 'rounded-xl border border-gray-600',
      title: 'text-lg sm:text-xl md:text-2xl',
      htmlContainer: 'text-sm sm:text-base'
    }
  });
};

export const showWalletErrorAlert = (title: string, message: string) => {
  return Swal.fire({
    title: title,
    text: message,
    icon: 'warning',
    confirmButtonText: 'Install Wallet',
    confirmButtonColor: '#F59E0B',
    background: '#1F2937',
    color: '#FFFFFF',
    width: '90%',
    customClass: {
      popup: 'rounded-xl border border-gray-600',
      confirmButton: 'rounded-lg px-4 sm:px-6 py-2 sm:py-3 text-base sm:text-lg font-semibold w-full sm:w-auto',
      title: 'text-lg sm:text-xl md:text-2xl',
      htmlContainer: 'text-sm sm:text-base'
    }
  });
};
