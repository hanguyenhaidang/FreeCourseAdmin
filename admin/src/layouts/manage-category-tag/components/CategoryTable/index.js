import PropTypes from "prop-types";
import { Box, Button, Chip, Paper, Stack } from "@mui/material";
import RenderTable from "components/RenderTable";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  Visibility,
  Edit,
  Delete,
  VisibilityRounded,
  EditRounded,
  AddRounded,
} from "@mui/icons-material";
import { getRandomItem } from "utils/array-utils";
import colors from "utils/colors";
import Image from "components/Image";
import SoftButton from "components/SoftButton";
// import DeleteAction from "../DeleteAction";
import { getAllCategories } from "services/api/categoryAPI";
import DeleteAction from "../action/Delete/DeleteAction";
import EditAction from "../action/Edit/EditAction";

const TYPE = "category";

const CategoryTable = (props) => {
  const [search, setSearch] = useState({ page: 0 });
  const columns = useMemo(
    () => [
      {
        headerName: "Tên",
        field: "name",
        width: 200,
        valueGetter: ({ row }) => {
          return row.name;
        },
        flex: 1,
      },
      {
        headerName: "URL",
        field: "urlPath",
        width: 210,
        valueGetter: ({ row }) => {
          return row.urlPath;
        },
        flex: 1,
      },
      {
        headerName: "Hành động",
        field: "action",
        width: 250,
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
      getAllCategories()
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

CategoryTable.defaultProps = {
  noGutter: false,
};

CategoryTable.propTypes = {
  row: PropTypes.any,
  noGutter: PropTypes.bool,
};
export default CategoryTable;
