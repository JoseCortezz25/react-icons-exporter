import { DetectedIconsPanel } from '@ui/components/organisms/detected-icons-panel';
import { InitialViewTemplate } from '@ui/components/templates/initial-view-template';
import { Button } from '@ui/components/ui/button';
import { messages } from '@ui/messages';
import { useDetectionModeStore } from '@ui/store/useDetectionModeStore';

export function IconsReviewPage() {
  const {
    detectedIcons,
    groupedCount,
    selectedIconIds,
    toggleIconSelection,
    selectAllIcons,
    clearSelectedIcons,
    goToInitial
  } = useDetectionModeStore();

  const goToExportConfig = useDetectionModeStore(
    state => state.goToExportConfig
  );

  const selectedCount = selectedIconIds.length;
  const allSelected =
    detectedIcons.length > 0 && selectedCount === detectedIcons.length;

  const handleToggleSelectAll = () => {
    if (allSelected) {
      clearSelectedIcons();
      return;
    }

    selectAllIcons();
  };

  const handleExport = () => {
    goToExportConfig();
  };

  return (
    <InitialViewTemplate>
      <section className="icons-review-page">
        <header className="icons-review-page__header">
          <div>
            <p className="icons-review-page__label">
              {messages.iconsReviewPage.heading.label}
            </p>
            <h2 className="icons-review-page__title">
              {messages.iconsReviewPage.heading.title}
            </h2>
          </div>

          <Button
            type="button"
            variant="outline"
            onClick={goToInitial}
            className="icons-review-page__mode-btn"
          >
            {messages.iconsReviewPage.actions.changeMode}
          </Button>
        </header>

        <DetectedIconsPanel
          icons={detectedIcons}
          groupedCount={groupedCount}
          selectedIconIds={selectedIconIds}
          onToggleIcon={toggleIconSelection}
        />

        <div className="icons-review-page__actions">
          <Button
            type="button"
            variant="outline"
            onClick={handleToggleSelectAll}
            className="icons-review-page__secondary-btn"
            disabled={detectedIcons.length === 0}
          >
            {allSelected
              ? messages.iconsReviewPage.actions.deselectAll
              : messages.iconsReviewPage.actions.selectAll}
          </Button>

          <Button
            type="button"
            onClick={handleExport}
            className="icons-review-page__primary-btn"
            disabled={selectedCount === 0}
          >
            {messages.iconsReviewPage.actions.exportSelected(selectedCount)}
          </Button>
        </div>
      </section>
    </InitialViewTemplate>
  );
}
