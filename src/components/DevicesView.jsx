import React, { Component } from 'react'

import tableStyles from 'styles/table.styl'

import classNames from 'classnames'

import { translate } from 'cozy-ui/transpiled/react/I18n'
import Spinner from 'cozy-ui/transpiled/react/Spinner'
import MuiButton from 'cozy-ui/transpiled/react/MuiCozyTheme/Buttons'
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableHeader,
  TableCell
} from 'cozy-ui/transpiled/react/Table'
import Icon from 'cozy-ui/transpiled/react/Icon'
import { Media, Img, Bd } from 'cozy-ui/transpiled/react/Media'

import NoDevicesMessage from 'components/NoDevicesMessage'
import DevicesModaleRevokeView from 'components/DevicesModaleRevokeView'
import Page from 'components/Page'
import PageTitle from 'components/PageTitle'

import mobileIcon from 'assets/icons/icon-device-phone.svg'
import browserIcon from 'assets/icons/icon-device-browser.svg'
import laptopIcon from 'assets/icons/icon-device-laptop.svg'

const deviceKindToIcon = {
  mobile: mobileIcon,
  browser: browserIcon
}

const getDeviceIcon = device => {
  return deviceKindToIcon[device.client_kind] || laptopIcon
}

class DevicesView extends Component {
  componentWillMount() {
    this.props.fetchDevices()
  }

  render() {
    const {
      t,
      f,
      isFetching,
      devices,
      openDeviceRevokeModale,
      deviceToRevoke,
      onDeviceModaleRevoke,
      onDeviceModaleRevokeClose,
      devicePerformRevoke
    } = this.props
    return (
      <Page narrow={!isFetching && devices.length === 0}>
        <PageTitle>{t('DevicesView.title')}</PageTitle>
        {isFetching && (
          <Spinner
            className={'u-pos-fixed-s'}
            middle
            size="xxlarge"
            loadingType="loading"
          />
        )}
        {!isFetching && devices.length === 0 && <NoDevicesMessage />}
        {!isFetching && devices.length > 0 && (
          <Table className={tableStyles['coz-table']}>
            {openDeviceRevokeModale && (
              <DevicesModaleRevokeView
                cancelAction={onDeviceModaleRevokeClose}
                revokeDevice={devicePerformRevoke}
                device={deviceToRevoke}
              />
            )}
            <TableHead>
              <TableRow>
                <TableHeader className={tableStyles['set-table-name']}>
                  {t('DevicesView.head_name')}
                </TableHeader>
                <TableHeader
                  className={classNames(
                    tableStyles['coz-table-header'],
                    tableStyles['set-table-date']
                  )}
                >
                  {t('DevicesView.head_sync')}
                </TableHeader>
                <TableHeader
                  className={classNames(
                    tableStyles['coz-table-header'],
                    tableStyles['set-table-actions']
                  )}
                >
                  {t('DevicesView.head_actions')}
                </TableHeader>
              </TableRow>
            </TableHead>
            <TableBody className={tableStyles['set-table-devices']}>
              {devices.map(device => (
                <TableRow key={device.id}>
                  <TableCell
                    className={classNames(
                      tableStyles['set-table-name'],
                      tableStyles['coz-table-primary']
                    )}
                  >
                    <Media>
                      <Img>
                        <Icon icon={getDeviceIcon(device)} size={32} />
                      </Img>
                      <Bd className="u-ml-1">{device.client_name}</Bd>
                    </Media>
                  </TableCell>
                  <TableCell className={tableStyles['set-table-date']}>
                    {device.synchronized_at
                      ? f(
                          device.synchronized_at,
                          t('DevicesView.sync_date_format')
                        )
                      : '-'}
                  </TableCell>
                  <TableCell className={tableStyles['set-table-actions']}>
                    <MuiButton
                      color="primary"
                      onClick={() => {
                        onDeviceModaleRevoke(device)
                      }}
                    >
                      {t('DevicesView.revoke')}
                    </MuiButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </Page>
    )
  }
}

export default translate()(DevicesView)
