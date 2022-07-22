import PropTypes from "prop-types";
import { Box, Button, Chip, Paper, Stack } from "@mui/material";
import RenderTable from "components/RenderTable";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Visibility, Edit, Delete, VisibilityRounded } from "@mui/icons-material";
import { getRandomItem } from "utils/array-utils";
import colors from "utils/colors";
import Image from "components/Image";
import SoftButton from "components/SoftButton";
// import DeleteAction from "../DeleteAction";
import { getAllTags } from "services/api/categoryAPI";
import EditAction from "../action/Edit/EditAction";
import DeleteAction from "../action/Delete/DeleteAction";

const TYPE = "tag";

const TagTable = (props) => {
  const [search, setSearch] = useState({ page: 0 });

  const columns = useMemo(
    () => [
      {
        headerName: "Tên tag",
        field: "name",
        valueGetter: ({ row }) => {
          return row.name;
        },
        flex: 1,
      },
      {
        headerName: "Hành động",
        field: "action",
        flex: 1,
        renderCell: (params) => (
          <Box>
            <EditAction
              type={TYPE}
              params={params}
              onEdit={() => setSearch((s) => ({ page: 0 }))}
            />
            <DeleteAction
              type={TYPE}
              params={params}
              onDelete={() => setSearch((s) => ({ page: 0 }))}
            />
          </Box>
        ),
      },
    ],
    []
  );

  const params = useMemo(() => ({ page: search.page, page_size: 10 }), [search]);

  const getData = useCallback(async () => {
    const data = await new Promise((resolve, reject) => {
      getAllTags()
        .then((res) => resolve(res))
        .catch((error) => reject(error));
    });
    return { data, totalRows: data.length };
  });

  return (
    <Stack gap={1} width="100%" height={500}>
      <RenderTable
        params={params}
        columns={columns}
        rowIdField="_id"
        rowHeight={100}
        rowsPerPageOptions={[10, 25, 50]}
        getData={getData}
      />
    </Stack>
  );
};

TagTable.defaultProps = {
  noGutter: false,
};

TagTable.propTypes = {
  row: PropTypes.any,
  noGutter: PropTypes.bool,
};
export default TagTable;
