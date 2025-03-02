/**
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
import SyntaxHighlighter from 'react-syntax-highlighter/dist/cjs/light';
// import sql from 'react-syntax-highlighter/dist/cjs/languages/hljs/sql';
import python from 'react-syntax-highlighter/dist/cjs/languages/hljs/python';
import github from 'react-syntax-highlighter/dist/cjs/styles/hljs/github';
import { t } from '@superset-ui/core';
import ModalTrigger from 'src/components/ModalTrigger';

SyntaxHighlighter.registerLanguage('python', python);

export interface HighlightedSqlProps {
  python: string;
  rawSql?: string;
  maxWidth?: number;
  maxLines?: number;
  shrink?: any;
}

interface HighlightedSqlModalTypes {
  rawSql?: string;
  python: string;
}

interface TriggerNodeProps {
  shrink: boolean;
  python: string;
  maxLines: number;
  maxWidth: number;
}

const shrinkSql = (python: string, maxLines: number, maxWidth: number) => {
  const ssql = python || '';
  let lines = ssql.split('\n');
  if (lines.length >= maxLines) {
    lines = lines.slice(0, maxLines);
    lines.push('{...}');
  }
  return lines
    .map(line => {
      if (line.length > maxWidth) {
        return `${line.slice(0, maxWidth)}{...}`;
      }
      return line;
    })
    .join('\n');
};

function TriggerNode({ shrink, python, maxLines, maxWidth }: TriggerNodeProps) {
  return (
    <SyntaxHighlighter language="python" style={github}>
      {shrink ? shrinkSql(python, maxLines, maxWidth) : python}
    </SyntaxHighlighter>
  );
}

function HighlightSqlModal({ rawSql, python }: HighlightedSqlModalTypes) {
  return (
    <div>
      <h4>{t('Source Python code')}</h4>
      <SyntaxHighlighter language="python" style={github}>
        {python}
      </SyntaxHighlighter>
      {rawSql && rawSql !== python && (
        <div>
          <h4>{t('Executed Python code')}</h4>
          <SyntaxHighlighter language="python" style={github}>
            {rawSql}
          </SyntaxHighlighter>
        </div>
      )}
    </div>
  );
}

function HighlightedSql({
  python,
  rawSql,
  maxWidth = 50,
  maxLines = 5,
  shrink = false,
}: HighlightedSqlProps) {
  return (
    <ModalTrigger
      modalTitle={t('Python code')}
      modalBody={<HighlightSqlModal rawSql={rawSql} python={python} />}
      triggerNode={
        <TriggerNode
          shrink={shrink}
          python={python}
          maxLines={maxLines}
          maxWidth={maxWidth}
        />
      }
    />
  );
}

export default HighlightedSql;
