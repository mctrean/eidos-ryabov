import { ThemeConfig, theme } from "antd";

export const colorPalette = {
  sc_base_5: "#F4F4F8",
  sc_base_6: "#FFF",
  sc_base_1: "#2F3144",
  sc_base_12: "#F4F4F4",
  sc_base_4: "#E0E0E0",
  sc_base_7: "#3761F3",
};

export const antdTheme: ThemeConfig = {
  algorithm: theme.defaultAlgorithm,
  token: {
    colorPrimary: colorPalette.sc_base_7,
    colorBgContainer: colorPalette.sc_base_6, 
    colorBgLayout: colorPalette.sc_base_5,
    colorText: colorPalette.sc_base_1,
    colorBorder: colorPalette.sc_base_4,
    borderRadius: 16,
    boxShadow: "0 4px 24px 0 rgba(0, 0, 0, 0.12)",
    fontFamily: '"Manrope", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
    fontSize: 15,
    lineHeight: 1.6,
    fontWeightStrong: 800,
  },
  components: {
    Layout: {
      siderBg: colorPalette.sc_base_6,
      bodyBg: colorPalette.sc_base_5,
      headerBg: colorPalette.sc_base_6,
    },
    Menu: {
      itemSelectedBg: colorPalette.sc_base_7,
      itemSelectedColor: colorPalette.sc_base_6,
      itemHoverBg: colorPalette.sc_base_12,
      itemColor: colorPalette.sc_base_1,
      iconSize: 24,
      itemHeight: 48,
      itemPaddingInline: 12,
      itemMarginBlock: 0,
      itemMarginInline: 0,
    },
    Button: {
      borderRadius: 12,
      paddingContentHorizontal: 16,
      primaryColor: colorPalette.sc_base_6,
      defaultBg: colorPalette.sc_base_12,
      defaultColor: colorPalette.sc_base_1,
    },
  },
};
