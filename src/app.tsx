import '@opensumi/ide-i18n/lib/browser';
import { SlotLocation } from '@opensumi/ide-core-browser';
import * as React from 'react';

import { CommonBrowserModules } from './common-modules';
import { renderApp } from './render-app';

// 引入公共样式文件
import '@opensumi/ide-core-browser/lib/style/index.less';
// antd opensumi 样式文件，如果你不需要使用antd组件，请移除
import '@opensumi/antd-theme/lib/index.css';

import { WebLiteModule }  from '../web-lite';

import { SampleModule } from './module';

import './styles.less';
import '../web-lite/i18n'
import { LayoutComponent } from './custom-layout-component';
import { CodeAPIModule } from '../web-lite/code-api';
import { parseUri, DEFAULT_URL } from '../web-lite/utils';

// 视图和slot插槽的对应关系
const layoutConfig = {
  [SlotLocation.top]: {
    modules: ['@opensumi/ide-menu-bar'],
  },
  [SlotLocation.action]: {
    modules: [''],
  },
  [SlotLocation.left]: {
    modules: ['@opensumi/ide-explorer', 'test-view'],
  },
  [SlotLocation.main]: {
    modules: ['@opensumi/ide-editor'],
  },
  [SlotLocation.right]: {
    modules: [],
  },
  [SlotLocation.statusBar]: {
    modules: ['@opensumi/ide-status-bar'],
  },
  [SlotLocation.bottom]: {
    modules: ['@opensumi/ide-output'],
  },
  [SlotLocation.extra]: {
    modules: [],
  },
};

// 请求 github 仓库地址 在hash上添加地址即可 如 http://0.0.0.0:8080/#https://github.com/opensumi/core
// 支持分支及tag  如 http://0.0.0.0:8080/#https://github.com/opensumi/core/tree/v2.15.0

const hash =
  location.hash.startsWith('#') && location.hash.indexOf('github') > -1 ? location.hash.split('#')[1] : DEFAULT_URL;

const { platform, owner, name, branch } = parseUri(hash);

renderApp({
  modules: [WebLiteModule, ...CommonBrowserModules, SampleModule, CodeAPIModule],
  layoutConfig,
  useCdnIcon: true,
  noExtHost: true,
  defaultPreferences: {
    'general.theme': 'ide-light',
    'general.icon': 'vsicons-slim',
    'application.confirmExit': 'never',
    'editor.quickSuggestionsDelay': 100,
    'editor.quickSuggestionsMaxCount': 50,
    'editor.scrollBeyondLastLine': false,
    'general.language': 'en-US',
  },
  workspaceDir: `/${platform}/${owner}/${name}`,
  extraContextProvider: (props) => (
    <div id='#hi' style={{ width: '100%', height: '100%' }}>
      {props.children}
    </div>
  ),
});