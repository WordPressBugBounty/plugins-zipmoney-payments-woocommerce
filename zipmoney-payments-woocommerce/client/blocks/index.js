/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';
import { getSetting } from '@woocommerce/settings';
import { registerPaymentMethod } from '@woocommerce/blocks-registry';
import { useEffect, useState } from '@wordpress/element';

/**
 * Internal dependencies
 */
import { PAYMENT_METHOD_NAME } from './constants';

const settings = getSetting('zipmoney_data', {});
console.log('zip settings:'.settings);
const defaultLabel = __('Zip now, pay later', 'zippayment');
const label = settings.title ? settings.title : defaultLabel;

/**
 * @typedef {import('@woocommerce/type-defs/registered-payment-method-props').RegisteredPaymentMethodProps} RegisteredPaymentMethodProps
 */

const saveZip = () => {
  return settings.savezip;
};

const SaveZipCheckbox = () => {
  const [isChecked, setChecked] = useState(saveZip);
  const handleChange = (event) => {
    setChecked(!isChecked);
    let formData = new FormData();
    formData.append('savezipaccount', !isChecked);
    const requestOptions = {
      method: 'POST',
      body: formData,
    };
    fetch(settings.sessionUrl, requestOptions).then((response) =>
      response.json(),
    );
  };
  useEffect(() => {
    Zip.Widget.render();
  }, []);
  if (settings.tokenisation === true) {
    return (
      <>
        {' '}
        <div class="zip-overlay" onclick="this.style.display = 'none';">
          <div class="zip-overlay-text"> Creating charge, please wait... </div>
        </div>
        <a
          id="zipmoney-learn-more"
          class="zip-hover"
          zm-widget="popup"
          zm-popup-asset="checkoutdialog"
        >
          {' '}
          Learn More{' '}
        </a>
        <input
          type="checkbox"
          rel="saveZipAccount"
          value="{isChecked}"
          id="saveZipAccount"
          checked={isChecked}
          onChange={handleChange}
          disabled={false}
        />
        <label className="save-zip-account" htmlFor={'saveZipAccount'}>
          {'Save Zip Account for future purchases'}
        </label>
      </>
    );
  }
  return (
    <>
      {' '}
      <div class="zip-overlay" onclick="this.style.display = 'none';">
        <div class="zip-overlay-text"> Creating charge, please wait... </div>
      </div>
      <a
        id="zipmoney-learn-more"
        class="zip-hover"
        zm-widget="popup"
        zm-popup-asset="checkoutdialog"
      >
        {' '}
        Learn More{' '}
      </a>
    </>
  );
};

/**
 * Label component
 *
 * @param {*} props Props from payment API.
 */
const Label = (props) => {
  const { PaymentMethodLabel } = props.components;
  return <PaymentMethodLabel text={label} />;
};

/**
 * Zipmoney payment method config object.
 */
const zipMoneyPaymentMethod = {
  name: PAYMENT_METHOD_NAME,
  label: <Label />,
  content: <SaveZipCheckbox />,
  edit: <SaveZipCheckbox />,
  canMakePayment: () => true,
  paymentMethodId: PAYMENT_METHOD_NAME,
  supports: {
    features: ['products'],
  },
  ariaLabel: label,
};

registerPaymentMethod(zipMoneyPaymentMethod);
