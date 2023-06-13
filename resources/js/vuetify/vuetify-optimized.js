// Vuetify
// import "vuetify/styles";
import "./vuetify-config.scss";
import { createVuetify } from "vuetify";
import * as directives from "vuetify/directives";

// All components
// import * as components from "vuetify/components";

// import { VListItem } from "vuetify/components/VListItem";
// import { VCard } from "vuetify/components/VCard";
// import { VAvatar } from "vuetify/components/VAvatar";
// import { VResponsive } from "vuetify/components/VResponsive";
// import { VImg } from "vuetify/components/VImg";
// import { VSwitch } from "vuetify/components/VSwitch";
// import { VInput } from "vuetify/components/VInput";
// import { VProgressCircular } from "vuetify/components/VProgressCircular";
// import { VIcon } from "vuetify/components/VIcon";
// import { VAutocomplete } from "vuetify/components/VAutocomplete";
// import { VCheckbox } from "vuetify/components/VCheckbox";
// import { VSelect } from "vuetify/components/VSelect";
// import { VChip } from "vuetify/components/VChip";
// import { VChipGroup } from "vuetify/components/VChipGroup";
// import { VMenu } from "vuetify/components/VMenu";
// import { VOverlay } from "vuetify/components/VOverlay";
// import { VNavigationDrawer } from "vuetify/components/VNavigationDrawer";
// import { VTextarea } from "vuetify/components/VTextarea";
// import { VTextField } from "vuetify/components/VTextField";
// import { VAppBar } from "vuetify/components/VAppBar";
// import { VToolbar } from "vuetify/components/VToolbar";
// import { VBtn } from "vuetify/components/VBtn";
// import { VDivider } from "vuetify/components/VDivider";
// import { VList } from "vuetify/components/VList";
// import { VSnackbar } from "vuetify/components/VSnackbar";
// import { VPagination } from "vuetify/components/VPagination";
// import { VTable } from "vuetify/components/VTable";
// import { VFileInput } from "vuetify/components/VFileInput";
// import { VSheet } from "vuetify/components/VSheet";
// import { VMain } from "vuetify/components/VMain";
// import { VDialog } from "vuetify/components/VDialog";
// import { VApp } from "vuetify/components/VApp";
// import { VAlert } from "vuetify/components/VAlert";
// import { VItemGroup } from "vuetify/components/VItemGroup";

// import {VSelectionControlGroup} from "vuetify/components/VSelectionControlGroup";
// import {VSelectionControl} from "vuetify/components/VSelectionControl";
// import {VMessages} from "vuetify/components/VMessages";
// import {VLabel} from "vuetify/components/VLabel";
// import {VProgressLinear} from "vuetify/components/VProgressLinear";
// import {VCounter} from "vuetify/components/VCounter";
// import {VField} from "vuetify/components/VField";
// import {VBtnGroup} from "vuetify/components/VBtnGroup";
// import {VBtnToggle} from "vuetify/components/VBtnToggle";
// import {VGrid} from "vuetify/components/VGrid";
// import {VLocaleProvider} from "vuetify/components/VLocaleProvider";
// import {VParallax} from "vuetify/components/VParallax";
// import {VRadioGroup} from "vuetify/components/VRadioGroup";
// import {VRating} from "vuetify/components/VRating";
// import {VSlideGroup} from "vuetify/components/VSlideGroup";
// import {VSystemBar} from "vuetify/components/VSystemBar";
// import {VTabs} from "vuetify/components/VTabs";
// import {VTab} from "vuetify/components/VTab";
// import {VThemeProvider} from "vuetify/components/VThemeProvider";
// import {VTimeline} from "vuetify/components/VTimeline";
// import {VTooltip} from "vuetify/components/VTooltip";
// import {VVirtualScroll} from "vuetify/components/VVirtualScroll";
// import {VRipple} from "vuetify/components/VRipple";
// import {VBadge} from "vuetify/components/VBadge";
// import {VBanner} from "vuetify/components/VBanner";
// import {VBottomNavigation} from "vuetify/components/VBottomNavigation";
// import {VBreadcrumbs} from "vuetify/components/VBreadcrumbs";
// import {VCarousel} from "vuetify/components/VCarousel";
// import {VWindow} from "vuetify/components/VWindow";
// import {VCode} from "vuetify/components/VCode";
// import {VColorPicker} from "vuetify/components/VColorPicker";
// import {VColorPickerCanvas} from "vuetify/components/VColorPickerCanvas";
// import {VColorPickerEdit} from "vuetify/components/VColorPickerEdit";
// import {VColorPickerPreview} from "vuetify/components/VColorPickerPreview";
// import {VSlider} from "vuetify/components/VSlider";
// import {VSliderThumb} from "vuetify/components/VSliderThumb";
// import {VSliderTrack} from "vuetify/components/VSliderTrack";
// import {VColorPickerSwatches} from "vuetify/components/VColorPickerSwatches";
// import {VCombobox} from "vuetify/components/VCombobox";
// import {VExpansionPanel} from "vuetify/components/VExpansionPanel";
// import {VFooter} from "vuetify/components/VFooter";
// import {VKbd} from "vuetify/components/VKbd";
// import {VLayout} from "vuetify/components/VLayout";
// import {VLayoutItem} from "vuetify/components/VLayoutItem";
// manual import
// import { VCard } from 'vuetify/components/VCard'
import {
    VListItem,
    VCard,
    VAvatar,
    VResponsive,
    VImg,
    VSwitch,
    // VSelectionControlGroup,
    // VSelectionControl,
    // VMessages,
    VInput,
    // VLabel,
    VProgressCircular,
    // VProgressLinear,
    VIcon,
    VAutocomplete,
    VCheckbox,
    VSelect,
    VChip,
    VChipGroup,
    VMenu,
    VOverlay,
    VNavigationDrawer,
    VTextarea,
    VTextField,
    // VCounter,
    // VField,
    VAppBar,
    VToolbar,
    // VBtnGroup,
    // VBtnToggle,
    VBtn,
    // VGrid,
    VDivider,
    VList,
    // VLocaleProvider,
    // VParallax,
    // VRadioGroup,
    // VRating,
    // VSlideGroup,
    // VSystemBar,
    // VTabs,
    // VTab,
    // VThemeProvider,
    // VTimeline,
    // VTooltip,
    // VVirtualScroll,
    // VRipple,
    VSnackbar,
    VPagination,
    VTable,
    VFileInput,
    VSheet,
    VMain,
    VDialog,
    VApp,
    VAlert,
    // VBadge,
    // VBanner,
    // VBottomNavigation,
    // VBreadcrumbs,
    // VCarousel,
    // VWindow,
    // VCode,
    // VColorPicker,
    // VColorPickerCanvas,
    // VColorPickerEdit,
    // VColorPickerPreview,
    // VSlider,
    // VSliderThumb,
    // VSliderTrack,
    // VColorPickerSwatches,
    // VCombobox,
    // VExpansionPanel,
    // VFooter,
    VItemGroup,
    // VKbd,
    // VLayout,
    // VLayoutItem,
} from "vuetify/components";

// icon library - https://pictogrammers.com/library/mdi/
import { aliases, mdi } from "vuetify/iconsets/mdi-svg";

const vuetify = createVuetify({
    // all components
    // components,

    // manual import
    components: {
        VListItem,
        VCard,
        VAvatar,
        VResponsive,
        VImg,
        VSwitch,
        // VSelectionControlGroup,
        // VSelectionControl,
        // VMessages,
        VInput,
        // VLabel,
        VProgressCircular,
        // VProgressLinear,
        VIcon,
        VAutocomplete,
        VCheckbox,
        VSelect,
        VChip,
        VChipGroup,
        VMenu,
        VOverlay,
        VNavigationDrawer,
        VTextarea,
        VTextField,
        // VCounter,
        // VField,
        VAppBar,
        VToolbar,
        // VBtnGroup,
        // VBtnToggle,
        VBtn,
        // VGrid,
        VDivider,
        VList,
        // VLocaleProvider,
        // VParallax,
        // VRadioGroup,
        // VRating,
        // VSlideGroup,
        // VSystemBar,
        // VTabs,
        // VTab,
        // VThemeProvider,
        // VTimeline,
        // VTooltip,
        // VVirtualScroll,
        // VRipple,
        VSnackbar,
        VPagination,
        VTable,
        VFileInput,
        VSheet,
        VMain,
        VDialog,
        VApp,
        VAlert,
        // VBadge,
        // VBanner,
        // VBottomNavigation,
        // VBreadcrumbs,
        // VCarousel,
        // VWindow,
        // VCode,
        // VColorPicker,
        // VColorPickerCanvas,
        // VColorPickerEdit,
        // VColorPickerPreview,
        // VSlider,
        // VSliderThumb,
        // VSliderTrack,
        // VColorPickerSwatches,
        // VCombobox,
        // VExpansionPanel,
        // VFooter,
        VItemGroup,
        // VKbd,
        // VLayout,
        // VLayoutItem,
    },

    directives,
    theme: {
        defaultTheme: "mel",
        themes: {
            mel: {
                dark: false,
                colors: {
                    primary: "#000000",
                    secondary: "#C6A92D",
                    bg: "#f8fafc",
                    // textgrey: "#818181",
                    // white: "#FFFFFF",
                    // screenBg: "#f8fafc",
                    // Vuetify Action Colors
                    // secondary: '#f5f5f5',
                    // accent: '#82B1FF',
                    // error: '#FF5252',
                    // info: '#2196F3',
                    // success: "#4CAF50",
                    // warning: '#FFC107',
                },
            },
        },
    },
    icons: {
        defaultSet: "mdi",
        aliases,
        sets: {
            mdi,
        },
    },
});

export default vuetify;
