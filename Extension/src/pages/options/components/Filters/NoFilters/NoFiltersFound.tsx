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

import React from 'react';

import { translator } from '../../../../../common/translators/translator';
import { Icon } from '../../../../common/components/ui/Icon';

import './no-filters.pcss';

/**
 * All filter tabs: Text and icon displayed when no filters are found after search using the searchbar
 */
const NoFiltersFound = () => (
    <div className="no-filters">
        <Icon
            id="#no-filters-found"
            classname="icon--48 icon--gray-default"
            aria-hidden="true"
        />
        <div>{translator.getMessage('options_filters_empty_title')}</div>
    </div>
);

export { NoFiltersFound };
