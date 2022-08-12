/* eslint-disable react/prop-types */
import { Chip, Stack } from "@mui/material";
import { useMemo } from "react";
import { getRandomItem } from "utils/array-utils";
import colors from "utils/colors";

const ListTag = ({ row }) => {
    const colorArr = useMemo(
      () => row.tags?.map((item) => getRandomItem(colors)),
      [row.tags]
    );
    return (
      <Stack direction="row" gap={0.5}>
        {row.tags?.map((tag, index) => (
          <Chip
            key={index}
            sx={{ color: "#fff", backgroundColor: colorArr[index] }}
            label={tag.name}
          />
        ))}
      </Stack>
    );
  };

  export default ListTag