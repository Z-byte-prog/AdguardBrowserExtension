/**
 * @file
 * This file is part of AdGuard Browser Extension (https://github.com/AdguardTeam/AdguardBrowserExtension).
 *
 * AdGuard Browser Extension is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * AdGuard Browser Extension is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.
 * See the GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with AdGuard Browser Extension. If not, see <http://www.gnu.org/licenses/>.
 */

import { format } from 'date-fns';

import { messenger } from '../../services/messenger';
import { MessageType } from '../../../common/messages';

/**
 * Export types.
 *
 * @readonly
 * @enum {string}
 */
export const ExportTypes = {
    USER_FILTER: 'user_filter',
    ALLOW_LIST: 'allow_list',
    SETTINGS: 'settings',
};

const exportMetadata = {
    [ExportTypes.USER_FILTER]: {
        name: 'user_rules',
        messageType: MessageType.GetUserRules,
        ext: 'txt',
    },
    [ExportTypes.ALLOW_LIST]: {
        name: 'allowlist',
        messageType: MessageType.GetAllowlistDomains,
        ext: 'txt',
    },
    [ExportTypes.SETTINGS]: {
        name: 'settings',
        messageType: MessageType.LoadSettingsJson,
        ext: 'json',
    },
};

/**
 * Generates filename for exported `type`.
 *
 * @param {ExportTypes} type Type of export
 * @param {string} appVersion App version
 * @returns {string} Filename
 */
export const getExportedSettingsFilename = (type, appVersion) => {
    const { name, ext } = exportMetadata[type];
    const product = `adg_ext_${name}`;
    const currentTimeString = format(Date.now(), 'ddMMyy-HHmmss');
    return `${product}_${appVersion}_${currentTimeString}.${ext}`;
};

/**
 * Exports data to file and downloads it in browser.
 *
 * @param {ExportTypes} type Type of export
 */
export const exportData = async (type) => {
    const { messageType } = exportMetadata[type];
    const { content, appVersion } = await messenger.sendMessage(messageType);
    const filename = getExportedSettingsFilename(type, appVersion);
    const blob = new Blob([content]);
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.style.display = 'none';
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
};
