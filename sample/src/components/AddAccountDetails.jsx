import React, { useState } from 'react';

const AddAccountDetails = ({ onCancel, onCreate }) => {
  const [accountName, setAccountName] = useState('');
  const [accountType, setAccountType] = useState('');
  const [initialBalance, setInitialBalance] = useState('');
  const [setDefault, setSetDefault] = useState(false);
  const [touched, setTouched] = useState({});


  const handleSubmit = (e) => {
    e.preventDefault();
    if (accountName && accountType && initialBalance !== '') {
      onCreate({
        accountName,
        accountType,
        initialBalance: parseFloat(initialBalance),
        setDefault,
      });
    } else {
      setTouched({ accountName: true, accountType: true, initialBalance: true });
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-indigo-50 via-blue-50 to-purple-100 bg-opacity-90"
      aria-modal="true"
      role="dialog"
    >
      <form
        onSubmit={handleSubmit}
        className="relative rounded-3xl shadow-2xl max-w-lg w-full px-10 py-10 min-h-[500px] flex flex-col gap-10 bg-white text-gray-900"
      >
        <h2 className="text-3xl font-black text-center bg-gradient-to-r from-indigo-600 via-sky-500 to-purple-500 bg-clip-text text-transparent">
          Create Account
        </h2>

        <div className="flex flex-col gap-8">
          <div className="flex items-start gap-4">
            <div className="flex flex-col items-center mt-2">
              {/* <span className="w-3 h-3 rounded-full bg-indigo-500 shadow" />
              <span className="w-1 h-12 bg-indigo-100 mt-1" /> */}
            </div>
            <div className="flex-1">
              <label htmlFor="accountName" className="block text-xs font-medium text-gray-700">
                Account Name
              </label>
              <input
                id="accountName"
                type="text"
                value={accountName}
                onBlur={() => setTouched((t) => ({ ...t, accountName: true }))}
                onChange={(e) => setAccountName(e.target.value)}
                placeholder="e.g. Dream Savings"
                autoFocus
                className={`mt-2 w-full rounded-xl px-4 py-3 border ${touched.accountName && !accountName ? 'border-red-500' : 'border-gray-300'
                  } focus:ring-indigo-100 focus:border-indigo-500 outline-none transition bg-gray-50 text-gray-900`}
              />
              {touched.accountName && !accountName && (
                <span className="text-xs text-red-500 mt-1">Account Name is required</span>
              )}
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="flex flex-col items-center mt-2">
              {/* <span className="w-3 h-3 rounded-full bg-indigo-400 shadow" />
              <span className="w-1 h-12 bg-indigo-100 mt-1" /> */}
            </div>
            <div className="flex-1">
              <label htmlFor="accountType" className="block text-xs font-medium text-gray-700">
                Account Type
              </label>
              <select
                id="accountType"
                value={accountType}
                onBlur={() => setTouched((t) => ({ ...t, accountType: true }))}
                onChange={(e) => setAccountType(e.target.value)}
                className={`mt-2 w-full rounded-xl px-4 py-3 border ${touched.accountType && !accountType ? 'border-red-500' : 'border-gray-300'
                  } bg-white focus:outline-none focus:ring-indigo-100 focus:border-indigo-500 transition`}
              >
                <option value="" disabled>
                  Select type
                </option>
                <option value="Savings">Savings</option>
                <option value="Checking">Checking</option>
                <option value="Investment">Investment</option>
              </select>
              {touched.accountType && !accountType && (
                <span className="text-xs text-red-500 mt-1">Type is required</span>
              )}
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="flex flex-col items-center mt-2">
              {/* <span className="w-3 h-3 rounded-full bg-indigo-300 shadow" />
              <span className="w-1 h-8 bg-indigo-100 mt-1" /> */}
            </div>
            <div className="flex-1">
              <label htmlFor="initialBalance" className="block text-xs font-medium text-gray-700">
                Initial Balance
              </label>
              <input
                id="initialBalance"
                type="number"
                min="0"
                step="0.01"
                value={initialBalance}
                onBlur={() => setTouched((t) => ({ ...t, initialBalance: true }))}
                onChange={(e) => setInitialBalance(e.target.value)}
                placeholder="0.00"
                className={`mt-2 w-full rounded-xl px-4 py-3 border ${touched.initialBalance && initialBalance === '' ? 'border-red-500' : 'border-gray-300'
                  } focus:ring-indigo-100 focus:border-indigo-500 outline-none transition bg-gray-50 text-gray-900`}
              />
              {touched.initialBalance && initialBalance === '' && (
                <span className="text-xs text-red-500 mt-1">Balance is required</span>
              )}
            </div>
          </div>
        </div>

        <div className="flex items-center justify-center gap-3">
          <input
            id="setDefault"
            type="checkbox"
            checked={setDefault}
            onChange={(e) => setSetDefault(e.target.checked)}
            className="h-5 w-5 rounded border-gray-300 focus:ring-indigo-500 accent-indigo-600"
          />
          <label htmlFor="setDefault" className="text-base font-medium select-none text-gray-700">
            Use as default account
          </label>
        </div>

        <div className="flex gap-3 justify-end mt-4">
          <button
            type="button"
            onClick={onCancel}
            className="px-6 py-2 rounded-lg border border-gray-300 text-gray-700 bg-white hover:bg-gray-100 font-medium transition"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-6 py-2 rounded-lg font-semibold text-white shadow bg-gradient-to-r from-indigo-500 via-blue-500 to-purple-500 hover:from-indigo-600 hover:via-blue-600 hover:to-purple-600 transition"
          >
            Create Account
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddAccountDetails;
