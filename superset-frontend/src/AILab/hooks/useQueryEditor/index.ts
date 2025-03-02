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
import { pick } from 'lodash';
import { shallowEqual, useSelector } from 'react-redux';
import { SqlLabRootState, QueryEditor } from 'src/AILab/types';

export default function useQueryEditor<T extends keyof QueryEditor>(
  sqlEditorId: string,
  attributes: ReadonlyArray<T>,
) {
  return useSelector<SqlLabRootState, Pick<QueryEditor, T | 'id'>>(
    ({ sqlLab: { unsavedQueryEditor, queryEditors } }) =>
      pick(
        {
          ...queryEditors.find(({ id }) => id === sqlEditorId),
          ...(sqlEditorId === unsavedQueryEditor?.id && unsavedQueryEditor),
        },
        ['id'].concat(attributes),
      ) as Pick<QueryEditor, T | 'id'>,
    shallowEqual,
  );
}
