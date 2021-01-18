// @flow
import React, { Component, Fragment } from 'react';
import { observer } from 'mobx-react';
import { defineMessages, intlShape } from 'react-intl';
import classNames from 'classnames';
import BorderedBox from '../../widgets/BorderedBox';
import { DECIMAL_PLACES_IN_ADA } from '../../../config/numbersConfig';
import styles from './WalletNativeTokensSummary.scss';
import Wallet from '../../../domains/Wallet';
import globalMessages from '../../../i18n/global-messages';

const messages = defineMessages({
  transactionsLabel: {
    id: 'wallet.summary.page.transactionsLabel',
    defaultMessage: '!!!Number of transactions',
    description: '"Number of transactions" label on Wallet summary page',
  },
  pendingTransactionsLabel: {
    id: 'wallet.summary.page.pendingTransactionsLabel',
    defaultMessage: '!!!Number of pending transactions',
    description:
      '"Number of pending transactions" label on Wallet summary page',
  },
  tokensTitle: {
    id: 'wallet.summary.page.tokensTitle',
    defaultMessage: '!!!Tokens',
    description: 'Number of native tokens title on Wallet summary page',
  },
  tokenSendButton: {
    id: 'wallet.summary.page.tokenSendButton',
    defaultMessage: '!!!Send',
    description: 'Send button on Wallet summary page',
  },
});

type Props = {
  wallet: Wallet,
  nativeTokens: Array<any>,
};

@observer
export default class WalletNativeTokensSummary extends Component<Props> {
  static contextTypes = {
    intl: intlShape.isRequired,
  };

  openSendTokenDialog = () => {
    // @todo
  };

  render() {
    const { wallet, nativeTokens } = this.props;
    const { intl } = this.context;

    const isRestoreActive = wallet.isRestoring;
    const numberOfNativeTokens = nativeTokens.length;

    return (
      <Fragment>
        <div className={styles.numberOfTokens}>
          {intl.formatMessage(messages.tokensTitle)} ({numberOfNativeTokens})
        </div>
        <div className={styles.component}>
          {nativeTokens.map((token) => (
            <BorderedBox className={styles.nativeTokenContainer} key={token.id}>
              <div className={styles.nativeTokenLeftContainer}>
                <div className={styles.walletName}>{token.name}</div>
                <div className={styles.walletAmount}>
                  {isRestoreActive
                    ? '-'
                    : token.amount.toFormat(DECIMAL_PLACES_IN_ADA)}
                  <span>
                    &nbsp;{intl.formatMessage(globalMessages.unitAda)}
                  </span>
                </div>
              </div>
              <div className={styles.nativeTokenRightContainer}>
                <button
                  className={classNames([
                    styles.nativeTokenSendButton,
                    token.amount.isZero() ? styles.disabled : null,
                  ])}
                  onClick={() => this.openSendTokenDialog(token)}
                >
                  {intl.formatMessage(messages.tokenSendButton)}
                </button>
              </div>
            </BorderedBox>
          ))}
        </div>
      </Fragment>
    );
  }
}